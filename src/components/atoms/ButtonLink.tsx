import { FC } from 'react';
import Link from 'next/link';
import styles from '@styles/components/atoms/Button.module.scss';

type Props = {
  href: string;
  variant: 'outlined' | 'contained';
  color: 'primary' | 'secondary';
  weight?: 'dark' | 'light';
};

const ButtonLink: FC<Props> = ({ children, href, variant, color, weight }) => {
  return (
    <div className={styles.root}>
      <Link href={href}>
        <a
          className={styles.link}
          data-variant={variant}
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
