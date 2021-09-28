import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from 'theme';
import useAllMember from 'hooks/useAllMember';
import Layout from 'components/templates/Layout';
import { MemberContext, Member } from 'context/context';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const { isError, isLoading, members } = useAllMember();
  const [member, setMember] = useState<Member>(null);
  const { pathname } = router;

  const checkAccount = useCallback(() => {
    const MEMBER_NAME = localStorage.getItem('MEMBER_NAME');
    if (!MEMBER_NAME) return router.replace('/login');
    if (members) {
      const target = members.contents.find((m) => m.name === MEMBER_NAME);
      setMember(
        target ? { name: target.name, dispName: target.dispName } : null
      );
    }
  }, [members]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    checkAccount();
  }, [checkAccount]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MemberContext.Provider value={member}>
        <Layout isHeader={pathname !== '/login'}>
          <Component {...pageProps} />
        </Layout>
      </MemberContext.Provider>
    </ThemeProvider>
  );
};
export default MyApp;
