import { FC } from 'react';
import { Box } from '@mui/material';

import Header from 'components/organisms/Header';
import Footer from 'components/organisms/Footer';
import { useAllMembers } from 'domains/microCMS/services/member';

type Props = {
  isHeader?: boolean;
  isFooter?: boolean;
};

const Layout: FC<Props> = ({ children, isHeader = true, isFooter = true }) => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {isHeader && <Header />}
      <Box component="main" flex="1 1 auto" pt={2}>
        {children}
      </Box>
      {isFooter && <Footer />}
    </Box>
  );
};

const EnhancedLayout: FC<Props> = ({
  children,
  isHeader = true,
  isFooter = true,
}) => {
  const allMember = useAllMembers();

  return (
    <Layout isHeader={isHeader} isFooter={isFooter}>
      {children}
    </Layout>
  );
};

export default EnhancedLayout;
