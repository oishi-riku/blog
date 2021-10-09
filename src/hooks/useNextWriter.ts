import useSWR from 'swr';

import { Articles } from 'domains/microCMS/models/article';
import fetcher from 'domains/microCMS/services/fetcher';

const BASE_ENDPOINT = process.env.NEXT_PUBLIC_MICRO_CMS_BASE_ENDPOINT || '';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useNextWriter = () => {
  const { data, error } = useSWR<Articles, Error>(
    `${BASE_ENDPOINT}/articles`,
    fetcher
  );

  if (error) {
    return { isError: true };
  }
  if (!data) {
    return { isLoading: true };
  }

  return { nextWriter: data.contents[0].next };
};

export default useNextWriter;
