import { Edit } from '@mui/icons-material';
import { Container, Typography, Box, Paper, Button } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { FC, useContext, useEffect, useCallback, useState } from 'react';

import ArticleMeta from 'components/atoms/ArticleMeta';
import ArticleArea from 'components/molecules/ArticleArea';
import { Article as ArticleSingle } from 'domains/microCMS/models/article';
import { getArticle } from 'domains/microCMS/services/article';
import { StoreContext } from 'hooks/useStore';

export type StaticProps = {
  article: ArticleSingle;
};

type Props = StaticProps & {
  isWriter: boolean;
};

const Article: FC<Props> = ({ article, isWriter }) => {
  return (
    <>
      <Head>
        <title>{`${article.title} | 3-5 9人ブログ`}</title>
        <meta name="description" content={`${article.title} 3-5 9人ブログ`} />
      </Head>
      <Container>
        {isWriter && (
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Link href={`/articles/${article.id}/edit`} passHref>
              <Button variant="outlined" endIcon={<Edit fontSize="small" />}>
                編集
              </Button>
            </Link>
          </Box>
        )}
        <Paper sx={{ p: 2 }} component="article">
          <Box mb={3}>
            <Typography variant="h1">{article.title}</Typography>
            <ArticleMeta date={article.createdAt} name={article.dispName} />
          </Box>
          <ArticleArea content={article.content} />
        </Paper>
      </Container>
    </>
  );
};

const EnhancedArticle: NextPage<StaticProps> = ({ article: a }) => {
  const { store } = useContext(StoreContext);
  const [article, setArticle] = useState(a);
  const isWriter = store.member?.name === article.name;

  const resetIsWriterArticle = useCallback(async () => {
    if (!isWriter) return;

    const _article = await getArticle(a.id);
    setArticle((current) => {
      return { ...current, ..._article };
    });
  }, [isWriter, a.id]);

  useEffect(() => {
    void resetIsWriterArticle();
  }, [resetIsWriterArticle]);

  return <Article article={article} isWriter={isWriter} />;
};

export default EnhancedArticle;
