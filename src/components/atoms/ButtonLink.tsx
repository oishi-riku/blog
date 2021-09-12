import { FC } from 'react';
import Link from 'next/link';
import styles from '@styles/components/atoms/ButtonLink.module.scss';

type Props = {
  href: string;
  color: 'primary' | 'secondary';
  weight?: 'main' | 'dark' | 'light';
};

const ButtonLink: FC<Props> = ({ children, href, color, weight }) => {
  return (
    <div className={styles.root}>
      <Link href={href}>
        <a
          className={styles.link}
          data-color={color}
          data-weight={weight ? weight : null}
        >
          {children}
        </a>
      </Link>
    </div>
  );
};

export default ButtonLink;
