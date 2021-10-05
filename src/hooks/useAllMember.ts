import useSWR from 'swr';
import { AllMember } from 'domains/microCMS/models/member';
import fetcher from 'domains/microCMS/services/fetcher';

const BASE_ENDPOINT = process.env.NEXT_PUBLIC_MICRO_CMS_BASE_ENDPOINT || '';

const useAllMember = () => {
  const { data, error } = useSWR<AllMember>(`${BASE_ENDPOINT}/member`, fetcher);

  if (error) {
    return { isError: true };
  }
  if (!data) {
    return { isLoading: true };
  }

  return { members: data };
};

export default useAllMember;
