import { createContext, useReducer, Dispatch } from 'react';

import { Member } from 'domains/microCMS/models/member';

export type Store = {
  member: Pick<Member, 'id' | 'name' | 'dispName'> | null;
  next: string;
};

type ChangeProp = {
  name: keyof Store;
  value: Store[keyof Store];
};

type Action = {
  type: 'UPDATE';
  payload: ChangeProp;
};

const StoreContext = createContext(
  {} as {
    store: Store;
    storeDispatch: Dispatch<Action>;
  }
);

const reducer = (state: Store, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case 'UPDATE':
      return {
        ...state,
        [payload.name]: payload.value,
      };
    default:
      return state;
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useStore = () => {
  const [state, dispatch] = useReducer(reducer, {
    member: null,
    next: '',
  });

  return { store: state, storeDispatch: dispatch };
};

export default useStore;
export { StoreContext };
