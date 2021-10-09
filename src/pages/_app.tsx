import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useCallback } from 'react';

import Layout from 'components/templates/Layout';
import useAllMember from 'hooks/useAllMember';
import useNextWriter from 'hooks/useNextWriter';
import useStore, { StoreContext } from 'hooks/useStore';
import theme from 'theme';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const { pathname } = router;
  const { members } = useAllMember();
  const { nextWriter } = useNextWriter();
  const { store, storeDispatch } = useStore();

  const setNextWriter = useCallback(() => {
    if (nextWriter) {
      storeDispatch({
        type: 'UPDATE',
        payload: {
          name: 'next',
          value: nextWriter,
        },
      });
    }
  }, [nextWriter, storeDispatch]);

  const checkAccount = useCallback(() => {
    const MEMBER_NAME = localStorage.getItem('MEMBER_NAME');
    if (!MEMBER_NAME) void router.replace('/login');
    if (members) {
      const target = members.contents.find((m) => m.name === MEMBER_NAME);
      storeDispatch({
        type: 'UPDATE',
        payload: {
          name: 'member',
          value: target
            ? { id: target.id, name: target.name, dispName: target.dispName }
            : null,
        },
      });
    }
  }, [members, storeDispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setNextWriter();
    checkAccount();
  }, [setNextWriter, checkAccount]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StoreContext.Provider value={{ store, storeDispatch }}>
        {(store.member || pathname === '/login') && (
          <Layout
            isLoginPage={pathname === '/login'}
            nextWriter={
              members && store.next
                ? {
                    name: store.next,
                    dispName:
                      members.contents.find((m) => m.name === store.next)
                        ?.dispName ?? '',
                  }
                : null
            }
          >
            <Component {...pageProps} />
          </Layout>
        )}
      </StoreContext.Provider>
    </ThemeProvider>
  );
};
export default MyApp;
