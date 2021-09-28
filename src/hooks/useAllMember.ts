import fetcher from 'domains/microCMS/services/member';
import useSWR from 'swr';

const BASE_ENDPOINT = process.env.NEXT_PUBLIC_MICRO_CMS_BASE_ENDPOINT || '';

const useAllMember = () => {
  const { data, error } = useSWR(`${BASE_ENDPOINT}/member`, fetcher);

  if (error) {
    return { isError: true };
  }
  if (!data) {
    return { isLoading: true };
  }
  return { members: data };
};

export default useAllMember;
