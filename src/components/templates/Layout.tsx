import { FC } from 'react';

import Footer from '@components/organisms/Footer';

const Layout: FC = ({ children }) => {
  return (
    <>
      <header>test</header>
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
