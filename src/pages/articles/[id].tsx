import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Container, Typography } from '@mui/material';

import Head from 'next/head';
import Layout from 'components/templates/Layout';
import { getArticle, getAllArticles } from 'domains/microCMS/services/article';
import { Article as ArticleSingle } from 'domains/microCMS/models/article';

type StaticProps = {
  article: ArticleSingle;
};

const Article: NextPage<StaticProps> = ({ article }) => {
  return (
    <>
      <Head>
        <title>3-5 9人ブログ</title>
        <meta name="description" content="3-5 9人ブログ" />
      </Head>
      <Layout>
        <Container>
          <article>
            <Typography variant="h1">{article.title}</Typography>
          </article>
        </Container>
      </Layout>
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
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const p = params as { id: string };
  const article = await getArticle(p.id);

  return {
    props: {
      article,
    },
  };
};

export default Article;
