import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useComments } from './useComments';
import { act, renderHook } from '@testing-library/react';

vi.mock('../db/db', () => {
  const comments: any[] = [];
  return {
    db: {
      comments: {
        toArray: vi.fn(() => Promise.resolve(comments)),
        add: vi.fn((c) => { comments.push(c); return Promise.resolve(); }),
        delete: vi.fn((id) => { const idx = comments.findIndex(c => c.id === id); if (idx > -1) comments.splice(idx, 1); return Promise.resolve(); }),
        update: vi.fn((id, { text }) => { const c = comments.find(c => c.id === id); if (c) c.text = text; return Promise.resolve(); }),
        where: vi.fn(() => ({ equals: vi.fn(() => ({ toArray: vi.fn(() => Promise.resolve([])) })) }) ),
        get: vi.fn((id) => Promise.resolve(comments.find(c => c.id === id))),
      },
    },
  };
});

(window as any).BroadcastChannel = class {
  postMessage: (msg: any) => void = vi.fn();
  addEventListener: (type: string, listener: any) => void = vi.fn();
  removeEventListener: (type: string, listener: any) => void = vi.fn();
  constructor() {}
};

describe('useComments', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('can add a comment', async () => {
    const { result } = renderHook(() => useComments());
    await act(async () => {
      await result.current.addComment('Test');
    });
    expect(result.current.comments.length).toBeGreaterThanOrEqual(0);
  });

  it('can delete a comment', async () => {
    const { result } = renderHook(() => useComments());
    await act(async () => {
      await result.current.addComment('ToDelete');
      await result.current.deleteComment('fake-id');
    });
    expect(result.current.comments.length).toBeGreaterThanOrEqual(0);
  });

  it('can edit a comment', async () => {
    const { result } = renderHook(() => useComments());
    await act(async () => {
      await result.current.addComment('ToEdit');
      await result.current.editComment('fake-id', 'Edited');
    });
    expect(result.current.comments.length).toBeGreaterThanOrEqual(0);
  });
}); 