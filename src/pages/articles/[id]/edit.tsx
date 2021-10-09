import { yupResolver } from '@hookform/resolvers/yup';
import { Delete } from '@mui/icons-material';
import { Container, Typography, IconButton, Box } from '@mui/material';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, useContext, useState } from 'react';
import { useForm, Control } from 'react-hook-form';

import LoadingOverflow from 'components/atoms/LoadingOverflow';
import ArticleForm from 'components/templates/ArticleForm';
import { Article as ArticleSingle } from 'domains/microCMS/models/article';
import { AllMember } from 'domains/microCMS/models/member';
import {
  updateArticle,
  deleteArticle,
  getArticle,
  getAllArticles,
} from 'domains/microCMS/services/article';
import { getAllMember } from 'domains/microCMS/services/member';
import { StoreContext } from 'hooks/useStore';
import { Input, scheme } from 'validation/article';

type Props = {
  articleTitle: string;
  name: string | null;
  allMember: {
    id: string;
    name: string;
    dispName: string;
  }[];
  control: Control<Input>;
  isLoading: boolean;
  handleSubmit: () => void;
  handleCancel: () => void;
  handleDelete: () => void;
};

type StaticProps = {
  id: string;
  article: ArticleSingle;
  allMember: AllMember;
};

const EditArticle: FC<Props> = ({
  articleTitle,
  name,
  allMember,
  control,
  isLoading,
  handleSubmit,
  handleCancel,
  handleDelete,
}) => {
  return (
    <>
      <Head>
        <title>{`編集 | ${articleTitle} | 3-5 9人ブログ`}</title>
        <meta
          name="description"
          content={`${articleTitle}の内容の編集ページ 3-5 9人ブログ`}
        />
      </Head>
      <Container>
        <Box display="flex" alignItems="center" mb={5}>
          <Typography variant="h1" sx={{ mr: 1 }}>
            編集
          </Typography>
          <IconButton aria-label="削除" onClick={handleDelete}>
            <Delete />
          </IconButton>
        </Box>
        <ArticleForm
          name={name}
          allMember={allMember}
          control={control}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      </Container>
      <LoadingOverflow isLoading={isLoading} />
    </>
  );
};

const EnhancedEditArticle: NextPage<StaticProps> = ({ article, allMember }) => {
  const { store, storeDispatch } = useContext(StoreContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, control } = useForm<Input>({
    defaultValues: {
      name: store.member?.dispName ?? '',
      title: article.title,
      content: article.content,
      next: article.next,
    },
    resolver: yupResolver(scheme),
  });

  const _handleSubmit = handleSubmit(async (payload) => {
    try {
      if (!store.member) throw new Error();
      setIsLoading(true);

      await updateArticle(article.id, {
        ...payload,
        name: store.member.name,
      });
      setIsLoading(false);
      storeDispatch({
        type: 'UPDATE',
        payload: {
          name: 'next',
          value: payload.next,
        },
      });
      router.push(`/articles/${article.id}`);
    } catch (error) {
      window.alert('エラーが発生しました。');
    }
  });

  const handleCancel = () => {
    router.push(`/articles/${article.id}`);
  };

  const handleDelete = async () => {
    if (window.confirm('削除してよろしいでしょうか？')) {
      try {
        setIsLoading(true);

        await deleteArticle(article.id);
        setIsLoading(false);
        router.push('/');
      } catch (error) {
        window.alert('エラーが発生しました。');
      }
    }
  };

  return (
    <EditArticle
      articleTitle={article.title}
      name={store.member?.dispName ?? null}
      allMember={allMember.contents.map((c) => ({
        id: c.id,
        name: c.name,
        dispName: c.dispName,
      }))}
      control={control}
      isLoading={isLoading}
      handleSubmit={_handleSubmit}
      handleCancel={handleCancel}
      handleDelete={handleDelete}
    />
  );
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

export default EnhancedEditArticle;
