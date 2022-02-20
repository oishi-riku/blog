import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import ArticleEdit, { StaticProps } from 'components/pages/articles/edit';
import { getArticle, getAllArticles } from 'domains/microCMS/services/article';
import { getAllMember } from 'domains/microCMS/services/member';

const Index: NextPage<StaticProps> = ({ id, article, allMember }) => {
  return <ArticleEdit id={id} article={article} allMember={allMember} />;
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
      allMember,
    },
    revalidate: 10,
  };
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

export default Index;
