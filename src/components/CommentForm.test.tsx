import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, vi, describe, it } from 'vitest';
import CommentForm from './CommentForm';

describe('CommentForm', () => {
  it('renders input and button', () => {
    render(<CommentForm onSubmit={vi.fn()} />);
    expect(screen.getByPlaceholderText(/type your message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  it('calls onSubmit with input value and clears input', async () => {
    const onSubmit = vi.fn();
    render(<CommentForm onSubmit={onSubmit} />);
    const input = screen.getByPlaceholderText(/type your message/i);
    await userEvent.type(input, 'Hello world!');
    fireEvent.submit(input.closest('form')!);
    expect(onSubmit).toHaveBeenCalledWith('Hello world!');
    expect(input).toHaveValue('');
  });

  it('does not call onSubmit for empty input', () => {
    const onSubmit = vi.fn();
    render(<CommentForm onSubmit={onSubmit} />);
    fireEvent.submit(screen.getByRole('textbox').closest('form')!);
    expect(onSubmit).not.toHaveBeenCalled();
  });
}); 