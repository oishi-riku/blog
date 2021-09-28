import { AllMember } from 'domains/microCMS/models/member';

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

export default fetcher;
