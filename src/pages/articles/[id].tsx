import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Container, Typography, Box, Paper } from '@mui/material';

import Head from 'next/head';
import ArticleArea from 'components/molecules/ArticleArea';
import ArticleMeta from 'components/atoms/ArticleMeta';
import { getArticle, getAllArticles } from 'domains/microCMS/services/article';
import { getAllMember } from 'domains/microCMS/services/member';
import { Article as ArticleSingle } from 'domains/microCMS/models/article';

type StaticProps = {
  article: ArticleSingle;
};

const Article: NextPage<StaticProps> = ({ article }) => {
  return (
    <>
      <Head>
        <title>{`${article.title} 3-5 9人ブログ`}</title>
        <meta name="description" content={`${article.title} 3-5 9人ブログ`} />
      </Head>
      <Container>
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

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await getAllArticles({ limit: '10000' });
  const paths = articles.contents.map((a) => ({
    params: {
      id: a.id,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const p = params as { id: string };
  const article = await getArticle(p.id);
  const allMember = await getAllMember();

  const a = {
    ...article,
    dispName:
      allMember.contents.find((m) => m.name === article.name)?.dispName ?? '',
  };

  return {
    props: {
      article: a,
    },
    revalidate: 30,
  };
};

export default Article;
