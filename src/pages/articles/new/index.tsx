import type { GetStaticProps, NextPage } from 'next';

import NewArticle, { StaticProps } from 'components/pages/articles/new';
import { getAllMember } from 'domains/microCMS/services/member';

const Index: NextPage<StaticProps> = ({ allMember }) => {
  return <NewArticle allMember={allMember} />;
};

export default Index;

export const getStaticProps: GetStaticProps = async () => {
  const allMember = await getAllMember();

  return {
    props: {
      allMember,
    },
  };
};
