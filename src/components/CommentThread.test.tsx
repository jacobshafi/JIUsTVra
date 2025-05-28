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
  });

  it('disables comment button until typing', async () => {
    render(<CommentThread />);
    const textarea = screen.getByPlaceholderText('Add a comment');
    const button = screen.getByRole('button', { name: /comment/i });
    expect(button).toBeDisabled();
    await userEvent.type(textarea, 'New comment');
    expect(button).toBeEnabled();
  });

  it('shows quote reply when menu is used', async () => {
    render(<CommentThread />);
    const menuButtons = screen.getAllByRole('button');
    fireEvent.click(menuButtons.find(btn => btn.getAttribute('aria-label') === null)!); // open menu
    await userEvent.click(screen.getByText(/quote reply/i));
    expect(screen.getByText(/quote reply/i)).toBeInTheDocument();
  });
}); 