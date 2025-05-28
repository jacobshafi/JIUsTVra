import { useState } from 'react';

interface Props {
  onSubmit: (text: string) => void;
}

export default function CommentForm({ onSubmit }: Props) {
  const [text, setText] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (text.trim()) {
          onSubmit(text.trim());
          setText('');
        }
      }}
      className="flex items-center gap-2"
    >
      <input
        className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type your message here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm"
      >
        Send
      </button>
    </form>
  );
}