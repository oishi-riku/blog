import { FC } from 'react';

import Header from '@components/organisms/Header';
import Footer from '@components/organisms/Footer';

import styles from '@styles/components/templates/Layout.module.scss';

type Props = {
  isHeader?: boolean;
  isFooter?: boolean;
};

const Layout: FC<Props> = ({ children, isHeader = true, isFooter = true }) => {
  return (
    <div className={styles.root}>
      {isHeader && <Header />}
      <main className={styles.main}>{children}</main>
      {isFooter && <Footer />}
    </div>
  );
};

export default Layout;
