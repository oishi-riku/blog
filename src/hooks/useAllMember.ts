import useSWR from 'swr';

import { AllMember } from 'domains/microCMS/models/member';
import fetcher from 'domains/microCMS/services/fetcher';

const BASE_ENDPOINT = process.env.NEXT_PUBLIC_MICRO_CMS_BASE_ENDPOINT || '';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useAllMember = () => {
  const { data, error } = useSWR<AllMember, Error>(
    `${BASE_ENDPOINT}/member`,
    fetcher
  );

  if (error) {
    return { isError: true };
  }
  if (!data) {
    return { isLoading: true };
  }

  return { members: data };
};

export default useAllMember;
