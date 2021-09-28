export type RESPONSE_BASE_SINGLE<T> = T & {
  id: string;
  createdAt: Date;
  publishedAt: Date;
  revisedAt: Date;
  updatedAt: Date;
};

export type RESPONSE_BASE_COLLECTION<T> = {
  contents: RESPONSE_BASE_SINGLE<T>[];
  limit: number;
  offset: number;
  totalCount: number;
};
