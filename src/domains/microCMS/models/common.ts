export type RESPONSE_BASE_SINGLE<T> = T & {
  id: string;
  createdAt: string;
  publishedAt: string;
  revisedAt: string;
  updatedAt: string;
};

export type RESPONSE_BASE_COLLECTION<T> = {
  contents: RESPONSE_BASE_SINGLE<T>[];
  limit: number;
  offset: number;
  totalCount: number;
};
