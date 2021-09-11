import { FC } from 'react';
import styles from '@styles/components/templates/Container.module.scss';

const Layout: FC = ({ children }) => {
  return <div className={styles.root}>{children}</div>;
};

export default Layout;
