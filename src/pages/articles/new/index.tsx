import { FC, useContext } from 'react';
import type { NextPage } from 'next';
import { Container, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useForm, Control } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, scheme } from 'validation/article';
import { AllMember } from 'domains/microCMS/models/member';
import { createArticle } from 'domains/microCMS/services/article';
import { getAllMember } from 'domains/microCMS/services/member';
import { MemberContext } from 'hooks/useMemberStore';
import ArticleForm from 'components/templates/ArticleForm';

import Head from 'next/head';

type Props = {
  name: string | null;
  allMember: AllMember;
  control: Control<Input>;
  handleSubmit: () => void;
  handleCancel: () => void;
};

const NewArticle: FC<Props> = ({
  name,
  allMember,
  control,
  handleSubmit,
  handleCancel,
}) => {
  return (
    <>
      <Head>
        <title>新規作成 | 3-5 9人ブログ</title>
        <meta name="description" content="新規作成 3-5 9人ブログ" />
      </Head>
      <Container>
        <Typography variant="h1" sx={{ mb: 5 }}>
          新規作成
        </Typography>
        <ArticleForm
          name={name}
          allMember={allMember}
          control={control}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      </Container>
    </>
  );
};

const EnhancedNewArticle: NextPage<{ allMember: AllMember }> = ({
  allMember,
}) => {
  const context = useContext(MemberContext);
  const router = useRouter();

  const { handleSubmit, control } = useForm<Input>({
    defaultValues: {
      name: '',
      title: '',
      content: '',
      next: '',
    },
    resolver: yupResolver(scheme),
  });

  const _handleSubmit = handleSubmit(async (payload) => {
    try {
      if (!context || !context.member) throw new Error();

      await createArticle({ ...payload, name: context.member.name });
      router.push('/');
    } catch (error) {
      window.alert('エラーが発生しました。');
    }
  });

  const handleCancel = () => {
    router.push('/');
  };

  return (
    <NewArticle
      name={context?.member?.dispName ?? null}
      allMember={allMember}
      control={control}
      handleSubmit={_handleSubmit}
      handleCancel={handleCancel}
    />
  );
};

export const getStaticProps = async () => {
  const allMember = await getAllMember();

  return {
    props: {
      allMember,
    },
  };
};

export default EnhancedNewArticle;
