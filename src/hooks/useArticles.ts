import useSWR from 'swr';

import { Articles } from 'domains/microCMS/models/article';
import fetcher from 'domains/microCMS/services/fetcher';

type Query = {
  limit: string;
};

const BASE_ENDPOINT = process.env.NEXT_PUBLIC_MICRO_CMS_BASE_ENDPOINT || '';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useArticles = (query?: Query) => {
  const q = query ? `?${new URLSearchParams(query).toString()}` : '';
  const { data, error } = useSWR<Articles, Error>(
    `${BASE_ENDPOINT}/articles${q}`,
    fetcher
  );

  if (error) {
    return { isError: true };
  }
  if (!data) {
    return { isLoading: true };
  }

  return { articles: data };
};

export default useArticles;
