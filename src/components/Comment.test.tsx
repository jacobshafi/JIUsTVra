import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect } from 'vitest';
import Comment from './Comment';

const baseComment = {
  id: '1',
  parentId: null,
  text: 'Hello **world**!',
  createdAt: Date.now(),
  author: 'user' as const,
};

describe('Comment', () => {
  it('renders comment card with avatar, username, and markdown', () => {
    render(<Comment comment={baseComment} />);
    expect(screen.getByText('You')).toBeInTheDocument();
    expect(screen.getByText(/hello/i)).toBeInTheDocument();
    expect(screen.getByText('world', { selector: 'strong' })).toBeInTheDocument();
    expect(screen.getByText('🧑')).toBeInTheDocument();
  });

  it('shows menu on button click and calls handlers', async () => {
    const onQuote = vi.fn();
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    let menuOpen = false;
    const setMenuOpen = vi.fn((open) => { menuOpen = open; });
    render(
      <Comment
        comment={baseComment}
        onQuote={onQuote}
        onEdit={onEdit}
        onDelete={onDelete}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
    );
    // Opens the menu for editing, deleting, and quote replying
    const menuBtn = screen.getByRole('button');
    fireEvent.click(menuBtn);
    expect(setMenuOpen).toHaveBeenCalledWith(true);
  });

  it('calls onQuote and closes menu', () => {
    const onQuote = vi.fn();
    const setMenuOpen = vi.fn();
    render(
      <Comment
        comment={baseComment}
        onQuote={onQuote}
        menuOpen={true}
        setMenuOpen={setMenuOpen}
      />
    );
    fireEvent.click(screen.getByText(/quote reply/i));
    expect(onQuote).toHaveBeenCalledWith(baseComment.text);
    expect(setMenuOpen).toHaveBeenCalledWith(false);
  });

  it('calls onEdit and closes menu', () => {
    const setMenuOpen = vi.fn();
    render(
      <Comment
        comment={baseComment}
        onEdit={vi.fn()}
        menuOpen={true}
        setMenuOpen={setMenuOpen}
      />
    );
    fireEvent.click(screen.getByText(/edit/i));
    expect(setMenuOpen).toHaveBeenCalledWith(false);
  });

  it('calls onDelete', () => {
    const onDelete = vi.fn();
    render(
      <Comment
        comment={baseComment}
        onDelete={onDelete}
        menuOpen={true}
        setMenuOpen={vi.fn()}
      />
    );
    fireEvent.click(screen.getByText(/delete/i));
    expect(onDelete).toHaveBeenCalledWith(baseComment.id);
  });
}); 