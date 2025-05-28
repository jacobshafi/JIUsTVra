import Comment from './Comment';
import CommentForm from './CommentForm';
import { type Comment as CommentType } from '../db/db';
import { X } from 'lucide-react';
import { useState } from 'react';

interface Props {
  parent: CommentType;
  comments: CommentType[];
  onClose: () => void;
  onReply: (text: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export default function ThreadPanel({ parent, comments, onClose, onReply, onDelete, onEdit }: Props) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const threadComments = comments
    .filter((c) => c.parentId === parent.id)
    .sort((a, b) => a.createdAt - b.createdAt);

  return (
    <div className="w-[340px] border-l flex flex-col bg-white">
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <h3 className="text-sm font-semibold text-gray-800">Thread</h3>
          <p className="text-xs text-gray-500">
            Replying to <span className="font-medium">{parent.text.slice(0, 30)}...</span>
          </p>
        </div>
        <button aria-label="Close thread" onClick={onClose} className="text-gray-500 hover:text-black">
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        <Comment comment={parent} onEdit={onEdit} menuOpen={openMenuId === parent.id} setMenuOpen={(open) => setOpenMenuId(open ? parent.id : null)} />
        {threadComments.map((c) => (
          <Comment 
            key={c.id} 
            comment={c} 
            onDelete={onDelete} 
            onEdit={onEdit}
            menuOpen={openMenuId === c.id}
            setMenuOpen={(open) => setOpenMenuId(open ? c.id : null)}
          />
        ))}
      </div>

      <div className="p-3 border-t">
        <CommentForm onSubmit={onReply} />
      </div>
    </div>
  );
}
