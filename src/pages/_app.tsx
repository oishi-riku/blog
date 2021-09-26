import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import Layout from 'components/templates/Layout';
import { useRouter } from 'next/router';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from 'theme';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    const MEMBER_NAME = localStorage.getItem('MEMBER_NAME');
    if (!MEMBER_NAME) router.push('/login');
  }, [pathname, router]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout isHeader={pathname !== '/login'}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};
export default MyApp;
