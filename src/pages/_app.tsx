import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useCallback } from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from 'theme';
import useAllMember from 'hooks/useAllMember';
import useNextWriter from 'hooks/useNextWriter';
import useMemberStore, { MemberContext } from 'hooks/useMemberStore';
import Layout from 'components/templates/Layout';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const { pathname } = router;
  const { members } = useAllMember();
  const { nextWriter } = useNextWriter();
  const { member, memberDispatch } = useMemberStore();

  const checkAccount = useCallback(() => {
    const MEMBER_NAME = localStorage.getItem('MEMBER_NAME');
    if (!MEMBER_NAME) return router.replace('/login');
    if (members) {
      const target = members.contents.find((m) => m.name === MEMBER_NAME);
      memberDispatch({
        type: 'SET',
        member: target
          ? { id: target.id, name: target.name, dispName: target.dispName }
          : null,
      });
    }
  }, [members, memberDispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    checkAccount();
  }, [checkAccount]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {(member || pathname === '/login') && (
        <MemberContext.Provider value={{ member, memberDispatch }}>
          <Layout
            isLoginPage={pathname === '/login'}
            nextWriter={
              members && nextWriter
                ? {
                    name: nextWriter,
                    dispName:
                      members.contents.find((m) => m.name === nextWriter)
                        ?.dispName ?? '',
                  }
                : null
            }
          >
            <Component {...pageProps} />
          </Layout>
        </MemberContext.Provider>
      )}
    </ThemeProvider>
  );
};
export default MyApp;
