import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, vi, describe, it } from 'vitest';
import ThreadPanel from './ThreadPanel';
import Comment from './Comment';


const parent = {
  id: '1',
  parentId: null,
  text: 'Parent comment',
  createdAt: Date.now(),
  author: 'user' as const,
};
const comments = [
  parent,
  { id: '2', parentId: '1', text: 'Reply 1', createdAt: Date.now(), author: 'user' as const },
  { id: '3', parentId: '1', text: 'Reply 2', createdAt: Date.now(), author: 'bot' as const },
];

describe('ThreadPanel', () => {
  it('renders parent and replies', () => {
    render(
      <ThreadPanel
        parent={parent}
        comments={comments}
        onClose={vi.fn()}
        onReply={vi.fn()}
        onDelete={vi.fn()}
        onEdit={vi.fn()}
      />
    );
    expect(screen.getByText('Parent comment')).toBeInTheDocument();
    expect(screen.getByText('Reply 1')).toBeInTheDocument();
    expect(screen.getByText('Reply 2')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(
      <ThreadPanel
        parent={parent}
        comments={comments}
        onClose={onClose}
        onReply={vi.fn()}
        onDelete={vi.fn()}
        onEdit={vi.fn()}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /close thread/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onReply when submitting reply', async () => {
    const onReply = vi.fn();
    render(
      <ThreadPanel
        parent={parent}
        comments={comments}
        onClose={vi.fn()}
        onReply={onReply}
        onDelete={vi.fn()}
        onEdit={vi.fn()}
      />
    );
    await userEvent.type(screen.getByPlaceholderText(/type your message/i), 'A reply');
    fireEvent.submit(screen.getByPlaceholderText(/type your message/i).closest('form')!);
    expect(onReply).toHaveBeenCalledWith('A reply');
  });

}); 