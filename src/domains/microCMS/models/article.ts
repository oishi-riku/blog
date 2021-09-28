import { RESPONSE_BASE_SINGLE, RESPONSE_BASE_COLLECTION } from './common';

type Item = {
  title: string;
  name: string;
  dispName: string;
  content: string;
};

export type Article = RESPONSE_BASE_SINGLE<Item>;
export type Articles = RESPONSE_BASE_COLLECTION<Item>;
