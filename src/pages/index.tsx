import type { NextPage } from 'next';
import Link from 'next/link';
import { Typography, Box, Container, Grid, Button } from '@mui/material';

import Head from 'next/head';
import ArticleCard from 'components/molecules/ArticleCard';
import { getAllArticles } from 'domains/microCMS/services/article';
import { Articles } from 'domains/microCMS/models/article';

type StaticProps = {
  articles: Articles;
};

const Home: NextPage<StaticProps> = ({ articles }) => {
  return (
    <>
      <Head>
        <title>3-5 9人ブログ</title>
        <meta name="description" content="3-5 9人ブログ" />
      </Head>
      <Container>
        <Typography variant="h1" align="center" sx={{ mb: 5 }}>
          9人
        </Typography>
        <Box display="flex" justifyContent="right" mb={2}>
          <Link href="/articles/new/" passHref>
            <Button variant="contained" color="primary">
              新規作成
            </Button>
          </Link>
        </Box>
        <Grid container spacing={2} component="ul">
          {articles.contents.map((a) => (
            <Grid key={a.id} item xs={12} sm={6} component="li">
              <ArticleCard
                title={a.title}
                date={a.createdAt}
                name={a.name}
                content={a.content}
                href={`/articles/${a.id}`}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export const getStaticProps = async () => {
  const articles = await getAllArticles();

  return {
    props: {
      articles,
    },
  };
};

export default Home;
