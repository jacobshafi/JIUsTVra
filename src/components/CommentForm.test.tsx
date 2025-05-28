import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import CommentForm from './CommentForm';

describe('CommentForm', () => {
  it('renders textarea and disabled button by default', () => {
    render(<CommentForm onSubmit={() => {}} />);
    const textarea = screen.getByPlaceholderText('Add a comment');
    const button = screen.getByRole('button', { name: /comment/i });
    expect(textarea).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('enables button when typing', async () => {
    render(<CommentForm onSubmit={() => {}} />);
    const textarea = screen.getByPlaceholderText('Add a comment');
    const button = screen.getByRole('button', { name: /comment/i });
    await userEvent.type(textarea, 'Hello!');
    expect(button).toBeEnabled();
  });

  it('shows quote reply and can clear it', async () => {
    const onClearQuote = vi.fn();
    render(<CommentForm onSubmit={() => {}} quotedText="A quote" onClearQuote={onClearQuote} />);
    expect(screen.getByText(/quote reply/i)).toBeInTheDocument();
    expect(screen.getByText('A quote')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /clear/i }));
    expect(onClearQuote).toHaveBeenCalled();
  });

  it('calls onSubmit and clears textarea', async () => {
    const onSubmit = vi.fn();
    render(<CommentForm onSubmit={onSubmit} />);
    const textarea = screen.getByPlaceholderText('Add a comment');
    const button = screen.getByRole('button', { name: /comment/i });
    await userEvent.type(textarea, 'Test comment');
    fireEvent.submit(button.closest('form'));
    expect(onSubmit).toHaveBeenCalledWith('Test comment');
    expect(textarea).toHaveValue('');
  });
}); 