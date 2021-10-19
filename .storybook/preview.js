import React from 'react';
import useStore, { StoreContext } from 'hooks/useStore';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const Wrapper = ({ children }) => {
  const { store, storeDispatch } = useStore({
    member: { id: 'test', name: 'riku_oishi', dispName: '大石陸' },
    next: 'takuya_suzuki',
  });

  return (
    <StoreContext.Provider value={{ store, storeDispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const decorators = [
  (Story) => {
    return (
      <Wrapper>
        <Story />
      </Wrapper>
    );
  },
];
