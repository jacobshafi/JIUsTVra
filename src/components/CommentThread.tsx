import { useComments } from '../hooks/useComments';
import CommentForm from './CommentForm';
import Comment from './Comment';
import ThreadPanel from './ThreadPanel';
import { useState } from 'react';
import { type Comment as CommentType } from '../db/db';

export default function CommentThread() {
  const { comments, addComment, deleteComment, editComment } = useComments();
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const rootComments = comments
    .filter((c) => c.parentId === null)
    .sort((a, b) => a.createdAt - b.createdAt);

  const activeThread = activeThreadId
    ? comments.find((c) => c.id === activeThreadId) || null
    : null;

  return (
    <div className="w-full max-w-6xl h-[80vh] bg-white shadow-lg rounded-lg flex border border-gray-300 overflow-hidden">
      {/* Left - Main */}
      <div className="flex flex-col flex-1">
        <div className="bg-gray-800 p-4 text-white flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white text-gray-800 text-xl flex items-center justify-center">💬</div>
          <div className="flex flex-col">
            <span className="text-sm font-bold">PulseDesk ;) </span>
            <span className="text-xs text-gray-300">Online</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4 bg-gray-50">
          {rootComments.map((comment) => {
            const replies = comments
              .filter((c) => c.parentId === comment.id)
              .sort((a, b) => a.createdAt - b.createdAt);
            return (
              <Comment
                key={comment.id}
                comment={comment}
                replies={replies}
                openThread={() => {
                  setActiveThreadId(comment.id);
                  setOpenMenuId(null);
                }}
                onDelete={deleteComment}
                onEdit={editComment}
                menuOpen={openMenuId === comment.id}
                setMenuOpen={(open) => setOpenMenuId(open ? comment.id : null)}
              />
            );
          })}
        </div>

        <div className="p-3 border-t bg-white">
          <CommentForm onSubmit={(text) => addComment(text)} />
        </div>
      </div>

      {/* Right - Thread */}
      {activeThread && (
        <ThreadPanel
          parent={activeThread}
          comments={comments}
          onClose={() => setActiveThreadId(null)}
          onReply={(text) => addComment(text, activeThread.id)}
          onDelete={deleteComment}
          onEdit={editComment}
        />
      )}
    </div>
  );
}