import type { NextPage } from 'next';
import Link from 'next/link';
import { Typography, Box, Container, Grid, Button } from '@mui/material';

import Head from 'next/head';
import ArticleCard from 'components/molecules/ArticleCard';
import { getAllArticles } from 'domains/microCMS/services/article';
import { Articles } from 'domains/microCMS/models/article';
import { getAllMember } from 'domains/microCMS/services/member';

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
                name={a.dispName}
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
  const allMember = await getAllMember();
  const contents = articles.contents.map((c) => {
    return {
      ...c,
      dispName:
        allMember.contents.find((m) => m.name === c.name)?.dispName ?? '',
    };
  });

  return {
    props: {
      articles: {
        ...articles,
        contents,
      },
    },
  };
};

export default Home;
