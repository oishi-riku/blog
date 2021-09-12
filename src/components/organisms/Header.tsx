import { FC } from 'react';
import Container from '@components/templates/Container';

import styles from '@styles/components/organisms/Header.module.scss';

const Header: FC = () => {
  return (
    <header className={styles.root}>
      <Container>
        <div className={styles.inner}>
          <button className={styles.menuBtn} type="button">
            大石陸
          </button>
        </div>
      </Container>
    </header>
  );
};

export default Header;
