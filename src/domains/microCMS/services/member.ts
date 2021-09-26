import { AllMember } from 'domains/microCMS/models/member';
import useSWR from 'swr';

const BASE_ENDPOINT = process.env.NEXT_PUBLIC_MICRO_CMS_BASE_ENDPOINT || '';
const X_API_KEY = process.env.NEXT_PUBLIC_X_API_KEY || '';

const fetcher = async (url: string): Promise<AllMember> => {
  const result = await fetch(url, {
    headers: {
      'X-API-KEY': X_API_KEY,
    },
  });
  const json = (await result.json()) as AllMember;
  return json;
};

export const useAllMembers = () => {
  const { data, error } = useSWR<AllMember, Error>(
    `${BASE_ENDPOINT}/member`,
    fetcher
  );

  if (error) return error;
  return data;
};
