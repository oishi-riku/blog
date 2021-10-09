import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Typography } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, useContext, useState } from 'react';
import { useForm, Control } from 'react-hook-form';
import LoadingOverflow from 'components/atoms/LoadingOverflow';
import ArticleForm from 'components/templates/ArticleForm';
import { AllMember } from 'domains/microCMS/models/member';
import { createArticle } from 'domains/microCMS/services/article';
import { getAllMember } from 'domains/microCMS/services/member';
import { MemberContext } from 'hooks/useMemberStore';
import { Input, scheme } from 'validation/article';

type Props = {
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
};

const NewArticle: FC<Props> = ({
  name,
  allMember,
  control,
  isLoading,
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
      <LoadingOverflow isLoading={isLoading} />
    </>
  );
};

const EnhancedNewArticle: NextPage<{ allMember: AllMember }> = ({
  allMember,
}) => {
  const context = useContext(MemberContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);

      await createArticle({ ...payload, name: context.member.name });
      setIsLoading(false);
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
      allMember={allMember.contents.map((c) => ({
        id: c.id,
        name: c.name,
        dispName: c.dispName,
      }))}
      control={control}
      isLoading={isLoading}
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
