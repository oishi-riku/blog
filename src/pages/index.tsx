import {
  Typography,
  Box,
  Container,
  Grid,
  Button,
  CircularProgress,
} from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { FC } from 'react';

import ArticleCard from 'components/molecules/ArticleCard';
import { Articles } from 'domains/microCMS/models/article';
import useAllMember from 'hooks/useAllMember';
import useArticles from 'hooks/useArticles';

type Props = {
  articles: Articles | null;
  isLoading: boolean;
};

const Home: FC<Props> = ({ articles, isLoading }) => {
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
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Link href="/articles/new/" passHref>
            <Button variant="contained" color="primary">
              新規作成
            </Button>
          </Link>
        </Box>
        {articles && (
          <>
            {(articles.contents.length === 0 && (
              <Typography>投稿がありません</Typography>
            )) || (
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
            )}
          </>
        )}
        {isLoading && (
          <Box textAlign="center" mt={3}>
            <CircularProgress aria-label="ローディング中" />
          </Box>
        )}
      </Container>
    </>
  );
};

const EnhancedHome: NextPage = () => {
  const { isLoading: isMemberLoading, members } = useAllMember();
  const { isLoading: isArticleLoading, articles } = useArticles({
    limit: '10000',
  });
  const contents =
    articles?.contents.map((c) => {
      return {
        ...c,
        dispName:
          members?.contents.find((m) => m.name === c.name)?.dispName ?? '',
      };
    }) ?? [];
  const a = !articles
    ? null
    : {
        ...articles,
        contents,
      };
  const isLoading = !!isMemberLoading && !!isArticleLoading;

  return <Home articles={a} isLoading={isLoading} />;
};

export default EnhancedHome;
