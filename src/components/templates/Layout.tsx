import { FC } from 'react';

import Header from '@components/organisms/Header';
import Footer from '@components/organisms/Footer';

const Layout: FC = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
