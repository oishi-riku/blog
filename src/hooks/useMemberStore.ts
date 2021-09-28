import { createContext, useReducer, Dispatch } from 'react';
import { Item } from 'domains/microCMS/models/member';

type Action = { type: 'SET' | 'DELETE'; member: Member };

type Member = Item | null;

const MemberContext = createContext<{
  member: Member;
  memberDispatch: Dispatch<Action>;
} | null>(null);

const reducer = (state: Member, action: Action) => {
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
