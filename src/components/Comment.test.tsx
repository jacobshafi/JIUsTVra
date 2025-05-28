import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, vi, describe, it } from 'vitest';
import Comment from './Comment';


describe('Comment', () => {
  const baseComment = {
    id: '1',
    parentId: null,
    text: 'Test comment',
    createdAt: Date.now(),
    author: 'user' as const,
  };

  it('renders comment text and author', () => {
    render(<Comment comment={baseComment} />);
    expect(screen.getByText('Test comment')).toBeInTheDocument();
    expect(screen.getByText('You')).toBeInTheDocument();
  });

  it('calls openThread when reply in thread is clicked', () => {
    const openThread = vi.fn();
    render(<Comment comment={baseComment} menuOpen={true} setMenuOpen={vi.fn()} openThread={openThread} />);
    const replyBtn = screen.getByText(/reply in thread/i);
    fireEvent.click(replyBtn);
    expect(openThread).toHaveBeenCalled();
  });

  it('calls onEdit when editing and saving', async () => {
    const onEdit = vi.fn();
    render(<Comment comment={baseComment} menuOpen={true} setMenuOpen={vi.fn()} onEdit={onEdit} />);
    fireEvent.click(screen.getByText(/edit/i));
    const textarea = screen.getByRole('textbox');
    await userEvent.clear(textarea);
    await userEvent.type(textarea, 'Edited!');
    fireEvent.click(screen.getByText(/save/i));
    expect(onEdit).toHaveBeenCalledWith('1', 'Edited!');
  });

  it('calls onDelete when delete is clicked', () => {
    const onDelete = vi.fn();
    render(<Comment comment={baseComment} menuOpen={true} setMenuOpen={vi.fn()} onDelete={onDelete} />);
    fireEvent.click(screen.getByText(/delete/i));
    expect(onDelete).toHaveBeenCalledWith('1');
  });

  it('shows menu on button click and hides on second click', () => {
    let menuOpen = false;
    const setMenuOpen = vi.fn((open) => { menuOpen = open; });
    const { rerender } = render(
      <Comment comment={baseComment} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    );
    const menuBtn = screen.getByRole('button');
    fireEvent.click(menuBtn);
    expect(setMenuOpen).toHaveBeenCalledWith(true);

    // Simulate menu now open
    rerender(<Comment comment={baseComment} menuOpen={true} setMenuOpen={setMenuOpen} />);
    fireEvent.click(menuBtn);
    expect(setMenuOpen).toHaveBeenCalledWith(false);
  });
}); 