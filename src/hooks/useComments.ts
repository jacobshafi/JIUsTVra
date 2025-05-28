import { useLiveQuery } from 'dexie-react-hooks';
import { db, type Comment } from '../db/db';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';

const channel = new BroadcastChannel('comments-sync'); // allows for cross-tab communication

export function useComments() {
  const comments = useLiveQuery(() => db.comments.toArray(), []) || [];

  // Listen for changes from other tabs
  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      const { type, data } = event.data;
      
      switch (type) {
        case 'ADD':
          await db.comments.add(data);
          break;
        case 'DELETE':
          await db.comments.delete(data.id);
          const children = await db.comments.where('parentId').equals(data.id).toArray();
          for (const c of children) await db.comments.delete(c.id);
          break;
        case 'EDIT':
          await db.comments.update(data.id, { text: data.text });
          break;
      }
    };

    channel.addEventListener('message', handleMessage);
    return () => channel.removeEventListener('message', handleMessage);
  }, []);

  const addComment = async (text: string, parentId: string | null = null) => {
    const newComment: Comment = {
      id: uuidv4(),
      parentId,
      text,
      createdAt: Date.now(),
      author: 'user',
    };
    await db.comments.add(newComment);
    channel.postMessage({ type: 'ADD', data: newComment });
  };

  const deleteComment = async (id: string) => {
    const comment = await db.comments.get(id);
    if (comment) {
      await db.comments.delete(id);
      const children = await db.comments.where('parentId').equals(id).toArray();
      for (const c of children) await db.comments.delete(c.id);
      channel.postMessage({ type: 'DELETE', data: { id } });
    }
  };

  const editComment = async (id: string, newText: string) => {
    await db.comments.update(id, { text: newText });
    channel.postMessage({ type: 'EDIT', data: { id, text: newText } });
  };

  return { comments, addComment, deleteComment, editComment };
}