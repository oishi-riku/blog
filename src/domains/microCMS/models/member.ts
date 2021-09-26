import { RESPONSE_BASE_SINGLE, RESPONSE_BASE_COLLECTION } from './common';

type Item = {
  name: string;
  dispName: string;
};

export type Member = RESPONSE_BASE_SINGLE<Item>;
export type AllMember = RESPONSE_BASE_COLLECTION<Item>;
