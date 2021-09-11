import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '@components/templates/Layout';
import Container from '@src/components/templates/Container';
import Grid from '@src/components/templates/Grid';
import ArticleCard from '@components/molecules/ArticleCard';
import Heading from '@components/atoms/Heading';
import { getAllArticles } from '@domains/microCMS/services/article';
import { Articles } from '@domains/microCMS/models/article';

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
      <Layout>
        <Container>
          <Heading level={1} align="center">
            9人
          </Heading>
          <Grid
            col={1}
            colPc={2}
            items={articles.contents.map((a) => ({
              id: a.id,
              item: (
                <ArticleCard
                  title={a.title}
                  date={a.createdAt}
                  name={a.name}
                  content={a.content}
                  href={`/articles/${a.id}`}
                />
              ),
            }))}
          ></Grid>
        </Container>
      </Layout>
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
