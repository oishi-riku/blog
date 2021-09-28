import { createContext } from 'react';
import { Item } from 'domains/microCMS/models/member';

export type Member = Item | null;
export const MemberContext = createContext<Member>(null);
