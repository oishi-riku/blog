import { createContext, useReducer, Dispatch } from 'react';
import { Member as M } from 'domains/microCMS/models/member';

export type Member = Pick<M, 'id' | 'name' | 'dispName'>;
type Action = { type: 'SET' | 'DELETE'; member: Member | null };

const MemberContext = createContext<{
  member: Member | null;
  memberDispatch: Dispatch<Action>;
} | null>(null);

const reducer = (state: Member | null, action: Action) => {
  switch (action.type) {
    case 'SET':
      return action.member;
    case 'DELETE':
      return null;
    default:
      return state;
  }
};

const useMemberStore = () => {
  const [state, dispatch] = useReducer(reducer, null);

  return { member: state, memberDispatch: dispatch };
};

export default useMemberStore;
export { MemberContext };
