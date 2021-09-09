import { FC } from 'react';
import Link from 'next/link';

import styles from '@styles/components/molecules/ArticleCard.module.scss';
import TypographyRowControl from '@components/atoms/TypographyRowControl';

type Props = {
  title: string;
  date: string;
  name: string;
  content: string;
  href: string;
};

const ArticleCard: FC<Props> = ({ title, date, name, content, href }) => {
  return (
    <div className={styles.root}>
      <Link href={href}>
        <a className={styles.link}>
          <div className={styles.head}>
            <b className={styles.headTitle}>{title}</b>
            <div className={styles.headData}>
              <time>{date}</time>
              <span>{name}</span>
            </div>
          </div>
          <div className={styles.body}>
            <TypographyRowControl maxRow={2}>{content}</TypographyRowControl>
          </div>
          <div className={styles.foot}>続きを読む</div>
        </a>
      </Link>
    </div>
  );
};

export default ArticleCard;
