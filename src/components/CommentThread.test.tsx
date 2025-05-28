import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect } from 'vitest';
import CommentThread from './CommentThread';


vi.mock('../hooks/useComments', () => ({
  useComments: () => ({
    comments: [
      { id: '1', parentId: null, text: 'Root', createdAt: Date.now(), author: 'user' as const },
      { id: '2', parentId: '1', text: 'Reply', createdAt: Date.now(), author: 'user' as const },
    ],
    addComment: vi.fn(),
    deleteComment: vi.fn(),
    editComment: vi.fn(),
  }),
}));

describe('CommentThread', () => {
  it('renders root and nested comments', () => {
    render(<CommentThread />);
    expect(screen.getByText('Root')).toBeInTheDocument();
    expect(screen.getByText('Reply')).toBeInTheDocument();
  });

  it('can add a comment', async () => {
    render(<CommentThread />);
    const input = screen.getByPlaceholderText(/type your message/i);
    await userEvent.type(input, 'New comment');
    fireEvent.submit(input.closest('form')!);
    // addComment is mocked, so just check input is cleared
    expect(input).toHaveValue('');
  });
}); 