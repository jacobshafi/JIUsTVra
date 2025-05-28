import { useState } from 'react';
import { type Comment as CommentType } from '../db/db';
import { MoreVertical } from 'lucide-react';

interface Props {
  comment: CommentType;
  openThread?: () => void;
  replies?: CommentType[];
  onDelete?: (id: string) => void;
  onEdit?: (id: string, newText: string) => void;
  menuOpen?: boolean;
  setMenuOpen?: (open: boolean) => void;
}

export default function Comment({ comment, openThread, replies, onDelete, onEdit, menuOpen, setMenuOpen }: Props) {
  const isBot = comment.author === 'bot';
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);

  function getLastAuthor() {
    const last = replies?.[replies.length - 1];
    if (!last) return '';
    return last.author === 'bot' ? 'Support Bot' : 'You';
  }

  function formatTime(timestamp: number) {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  const handleEdit = () => {
    if (editText.trim() && editText !== comment.text) {
      onEdit?.(comment.id, editText);
    }
    setIsEditing(false);
  };

  return (
    <div className="flex gap-2 px-4 py-2 group relative hover:bg-gray-100 rounded-md transition">
      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xl">
        {isBot ? '🤖' : '🧑'}
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-gray-800">{isBot ? 'Support Bot' : 'You'}</span>
          <span className="text-xs text-gray-500">{formatTime(comment.createdAt)}</span>
        </div>

        <div className="bg-gray-100 rounded-md px-3 py-2 text-sm text-gray-900 max-w-full shadow-sm relative">
          {isEditing ? (
            <div className="space-y-2">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full p-2 border rounded-md text-sm"
                rows={3}
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditText(comment.text);
                  }}
                  className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-200 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEdit}
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <>
              {comment.text}
              {(comment.author === 'user' || typeof openThread === 'function') && (
                <button
                  onClick={() => setMenuOpen?.(!menuOpen)}
                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition"
                >
                  <MoreVertical className="w-4 h-4 text-gray-500" />
                </button>
              )}
            </>
          )}

          {menuOpen && !isEditing && (
            <div className="absolute right-1 top-6 bg-white border shadow rounded-md text-sm z-10">
              {openThread && (
                <button onClick={openThread} className="block px-4 py-2 hover:bg-gray-100 w-full text-left">
                  Reply in thread
                </button>
              )}

              {comment.author === 'user' && (
                <>
                  <button 
                    onClick={() => {
                      setIsEditing(true);
                      setMenuOpen?.(false);
                    }} 
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => onDelete?.(comment.id)} 
                    className="block px-4 py-2 text-red-500 hover:bg-gray-100 w-full text-left"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {replies && replies.length > 0 && (
          <button
            onClick={openThread}
            className="mt-2 text-xs text-blue-600 hover:underline ml-2 flex flex-col items-start"
          >
            <div className="flex items-center gap-1">
              <span>{replies.length} {replies.length === 1 ? 'reply' : 'replies'}</span>
              <span className="text-gray-400">·</span>
              <span className="text-gray-500 italic">
                last by {getLastAuthor()} at {formatTime(replies[replies.length - 1].createdAt)}
              </span>
            </div>
            <div className="text-gray-600 mt-1 truncate max-w-xs">
              {replies[replies.length - 1].text}
            </div>
          </button>
        )}
      </div>
    </div>
  );
}