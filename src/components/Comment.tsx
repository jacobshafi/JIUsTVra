import { useState } from 'react';
import { type Comment as CommentType } from '../db/db';
import { MoreVertical } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Props {
  comment: CommentType;
  onDelete?: (id: string) => void;
  onEdit?: (id: string, newText: string) => void;
  menuOpen?: boolean;
  setMenuOpen?: (open: boolean) => void;
  onQuote?: (text: string) => void;
}

export default function Comment({
  comment,
  onDelete,
  onEdit,
  menuOpen,
  setMenuOpen,
  onQuote,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);

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
    <div className="flex items-start gap-4 group">
      {/* Avatar */}
      <div className="flex-shrink-0 w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center text-2xl border border-gray-300 mt-1 shadow-sm">
        🧑
      </div>
      {/* Message Card */}
      <div className="relative flex-1">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 px-6 py-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-gray-800">You</span>
            <span className="text-xs text-gray-400">{formatTime(comment.createdAt)}</span>
          </div>
          <div className="text-gray-900 text-[1rem] leading-relaxed prose prose-sm max-w-none">
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
              <ReactMarkdown
                components={{
                  blockquote: ({ node, ...props }) => (
                    <blockquote className="border-l-4 border-blue-300 bg-blue-50 px-3 py-1 my-2 text-gray-700 italic rounded-md" {...props} />
                  ),
                }}
              >
                {comment.text}
              </ReactMarkdown>
            )}
          </div>
        </div>
        {/* Menu Button */}
        <button
          onClick={() => setMenuOpen?.(!menuOpen)}
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition"
        >
          <MoreVertical className="w-5 h-5 text-gray-400 hover:text-gray-600" />
        </button>
        {menuOpen && !isEditing && (
          <div className="absolute right-2 top-10 bg-white border shadow rounded-md text-sm z-20 min-w-[140px] animate-fade-in">
            <button
              onClick={() => {
                onQuote?.(comment.text);
                setMenuOpen?.(false);
              }}
              className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
            >
              Quote reply
            </button>
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
          </div>
        )}
      </div>
    </div>
  );
}