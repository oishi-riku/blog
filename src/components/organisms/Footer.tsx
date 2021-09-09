import { FC } from 'react';

import styles from '@styles/components/organisms/Footer.module.scss';

const year = new Date().getFullYear();

const Footer: FC = () => {
  return (
    <footer className={styles.root}>
      <small>{`${year} 3-5 class.`}</small>
    </footer>
  );
};

export default Footer;
