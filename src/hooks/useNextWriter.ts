import useSWR from 'swr';
import fetcher from 'domains/microCMS/services/fetcher';
import { Articles } from 'domains/microCMS/models/article';

const BASE_ENDPOINT = process.env.NEXT_PUBLIC_MICRO_CMS_BASE_ENDPOINT || '';

const useNextWriter = () => {
  const { data, error } = useSWR<Articles>(
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
