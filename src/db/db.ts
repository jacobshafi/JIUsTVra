import Dexie from 'dexie';

export interface Comment {
  id: string;
  parentId: string | null;
  text: string;
  createdAt: number;
  author: 'user' | 'bot';
}

class CommentsDB extends Dexie {
  comments!: Dexie.Table<Comment, string>;

  constructor() {
    super('CommentsDB');
    this.version(1).stores({
      comments: 'id,parentId,createdAt,author',
    });
  }
}

export const db = new CommentsDB();