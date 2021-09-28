import { FC, useState } from 'react';
import { Box, Snackbar, Slide } from '@mui/material';
import { InView } from 'react-intersection-observer';
import Header from 'components/organisms/Header';
import Footer from 'components/organisms/Footer';

type Props = {
  nextWriter: { name: string; dispName: string } | null;
  isLoginPage?: boolean;
  isOpenSnackBar: boolean;
  handleInViewContent: (inView: boolean) => void;
  handleInViewFooter: (inView: boolean) => void;
};

const Layout: FC<Props> = ({
  children,
  nextWriter,
  isLoginPage,
  isOpenSnackBar,
  handleInViewContent,
  handleInViewFooter,
}) => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {!isLoginPage && <Header />}
      <Box component="main" flex="1 1 auto" pt={2}>
        <InView threshold={1} onChange={handleInViewContent}>
          {children}
        </InView>
      </Box>
      {!isLoginPage && nextWriter && (
        <Snackbar
          open={isOpenSnackBar}
          message={`次の人：${nextWriter.dispName}`}
          TransitionComponent={Slide}
          sx={{
            right: 'auto',
            color: 'common.white',
          }}
        />
      )}
      <InView threshold={0.5} onChange={handleInViewFooter}>
        <Footer />
      </InView>
    </Box>
  );
};

const EnhancedLayout: FC<Pick<Props, 'nextWriter' | 'isLoginPage'>> = ({
  children,
  nextWriter,
  isLoginPage = false,
}) => {
  const [isOpenSnackBar, setIsOpenSnackBar] = useState(true);
  const [isDisplayAllContent, setIsDisplayAllContent] = useState(false);

  const handleInViewContent = (inView: boolean) => {
    setIsDisplayAllContent(inView);

    if (inView) {
      setIsOpenSnackBar(true);
    }
  };
  const handleInViewFooter = (inView: boolean) => {
    console.log(isDisplayAllContent);
    if (isDisplayAllContent) {
      setIsOpenSnackBar(true);

      return;
    }
    setIsOpenSnackBar(!inView);
  };

  return (
    <Layout
      nextWriter={nextWriter}
      isLoginPage={isLoginPage}
      isOpenSnackBar={isOpenSnackBar}
      handleInViewContent={handleInViewContent}
      handleInViewFooter={handleInViewFooter}
    >
      {children}
    </Layout>
  );
};

export default EnhancedLayout;
