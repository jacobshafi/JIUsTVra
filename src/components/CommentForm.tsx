import { useState, useEffect, RefObject } from 'react';
import {
  GoBold,
  GoItalic,
  GoQuote,
  GoCode,
  GoLink,
  GoListUnordered,
  GoListOrdered,
  GoMention,
  GoTasklist,
} from 'react-icons/go';

interface Props {
  onSubmit: (text: string) => void;
  quotedText?: string;
  onClearQuote?: () => void;
  inputRef?: RefObject<HTMLTextAreaElement>;
}

export default function CommentForm({ onSubmit, quotedText, onClearQuote, inputRef }: Props) {
  const [text, setText] = useState(quotedText ? `> ${quotedText.replace(/\n/g, '\n> ')}\n\n` : '');

  useEffect(() => {
    if (quotedText && inputRef?.current) {
      const quoteBlock = `> ${quotedText.replace(/\n/g, '\n> ')}\n\n`;
      setText(quoteBlock);
      setTimeout(() => {
        const textarea = inputRef.current!;
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd = quoteBlock.length;
      }, 0);
    }
  }, [quotedText, inputRef]);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (text.trim()) {
          onSubmit(text.trim());
          setText('');
          onClearQuote?.();
        }
      }}
      className="bg-white border border-gray-100 rounded-2xl shadow-xl max-w-2xl mx-auto mt-4 transition-all duration-200"
      style={{
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
        borderTop: '4px solid #2D8EFF'
      }}
    >
      <div className="p-6">
        {quotedText && (
          <div className="mb-4">
            <span className="text-xs font-bold text-[#2D8EFF] uppercase tracking-widest mr-2">QUOTE REPLY</span>
            <button type="button" onClick={onClearQuote} className="text-xs text-[#2D8EFF] hover:underline font-medium">Clear</button>
            <blockquote className="border-l-4 border-[#2D8EFF] bg-blue-50/50 px-4 py-2 mt-2 text-[#2D8EFF] italic text-base rounded-md">
              {quotedText}
            </blockquote>
          </div>
        )}
        <textarea
          ref={inputRef}
          className="w-full min-h-[120px] px-5 py-4 border border-gray-200 rounded-xl text-lg bg-[#f9fbfd] focus:outline-none focus:ring-2 focus:ring-[#2D8EFF] transition placeholder:text-gray-400"
          placeholder="Add a comment"
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </div>
      <div className="flex justify-end border-t px-6 py-4 bg-[#f4f8fd] rounded-b-2xl">
        <button
          type="submit"
          className="bg-gradient-to-r from-[#2D8EFF] to-[#00C6FB] text-white px-6 py-2 rounded-xl font-bold shadow-md hover:from-[#1a6ed8] hover:to-[#009ec3] transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!text.trim()}
        >
          Comment
        </button>
      </div>
    </form>
  );
}