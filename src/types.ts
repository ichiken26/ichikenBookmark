export type Category = {
  id: string;
  name: string;
  sortOrder: number;
  bookmarkCount: number;
};

export type Bookmark = {
  id: string;
  categoryId: string;
  name: string;
  url: string;
  sortOrder: number;
};

export type ApiResponse<T> = {
  data: T;
  meta?: Record<string, number>;
};
