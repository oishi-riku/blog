import useSWR from 'swr';
import { AllMember } from 'domains/microCMS/models/member';

const X_API_KEY = process.env.NEXT_PUBLIC_X_API_KEY || '';
const BASE_ENDPOINT = process.env.NEXT_PUBLIC_MICRO_CMS_BASE_ENDPOINT || '';

const fetcher = async (url: string): Promise<AllMember> => {
  const result = await fetch(url, {
    headers: {
      'X-API-KEY': X_API_KEY,
    },
  });
  const json = (await result.json()) as AllMember;

  return json;
};

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
