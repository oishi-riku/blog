import { Article, Articles } from 'domains/microCMS/models/article';

const BASE_ENDPOINT = process.env.NEXT_PUBLIC_MICRO_CMS_BASE_ENDPOINT || '';
const X_API_KEY = process.env.NEXT_PUBLIC_X_API_KEY || '';
const X_WRITE_API_KEY = process.env.NEXT_PUBLIC_X_WRITE_API_KEY || '';

type Query = {
  limit: string;
};

export const getAllArticles = async (query?: Query): Promise<Articles> => {
  const q = query ? `?${new URLSearchParams(query).toString()}` : '';
  const result = await fetch(`${BASE_ENDPOINT}/articles${q}`, {
    headers: {
      'X-API-KEY': X_API_KEY,
    },
  });
  const json = (await result.json()) as Articles;
  return json;
};

export const getArticle = async (id: string): Promise<Article> => {
  const result = await fetch(`${BASE_ENDPOINT}/articles/${id}`, {
    headers: {
      'X-API-KEY': X_API_KEY,
    },
  });
  const json = (await result.json()) as Article;
  return json;
};

export const createArticle = async <T>(payload: T): Promise<void> => {
  const result = await fetch(`${BASE_ENDPOINT}/articles`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-WRITE-API-KEY': X_WRITE_API_KEY,
    },
    body: JSON.stringify(payload),
  });
  if (result.status >= 400) throw new Error();
};
