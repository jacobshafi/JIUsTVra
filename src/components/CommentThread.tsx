import { useComments } from '../hooks/useComments';
import CommentForm from './CommentForm';
import Comment from './Comment';
import { useState, useRef } from 'react';
import { type Comment as CommentType } from '../db/db';

export default function CommentThread() {
  const { comments, addComment, deleteComment, editComment } = useComments();
  const [quotedText, setQuotedText] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null!);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const rootComments = comments
    .filter((c) => c.parentId === null)
    .sort((a, b) => a.createdAt - b.createdAt);

  function handleQuote(text: string) {
    setQuotedText(text);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  }

  return (
    <div className="w-full min-h-screen bg-[#f6f8fa]">
      <div className="w-full border-b bg-white px-8 pt-8 pb-4">
        <div className="flex items-center gap-4 mb-2">
          <h1 className="text-2xl font-bold text-gray-900">
            Autarc's Billion Euro Project <span className="text-gray-400 font-normal">#941</span>
          </h1>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
            Open
          </span>
        </div>
        <div className="text-sm text-gray-500">
          Opened by <span className="font-medium text-gray-700">You</span> just now
        </div>
      </div>
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="space-y-4">
          {rootComments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              onDelete={deleteComment}
              onEdit={editComment}
              onQuote={handleQuote}
              menuOpen={openMenuId === comment.id}
              setMenuOpen={(open) => setOpenMenuId(open ? comment.id : null)}
            />
          ))}
        </div>
        <div className="mt-8">
          <CommentForm
            onSubmit={(text) => {
              addComment(text);
              setQuotedText(null);
            }}
            quotedText={quotedText ?? undefined}
            onClearQuote={() => setQuotedText(null)}
            inputRef={textareaRef}
          />
        </div>
      </div>
    </div>
  );
}