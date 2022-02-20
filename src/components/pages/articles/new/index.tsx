import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Typography } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, useContext, useState } from 'react';
import { useEffect } from 'react';
import { useForm, Control } from 'react-hook-form';

import LoadingOverflow from 'components/atoms/LoadingOverflow';
import ArticleForm from 'components/templates/ArticleForm';
import { AllMember } from 'domains/microCMS/models/member';
import { createArticle } from 'domains/microCMS/services/article';
import useDraftArticle from 'hooks/useDraftArticle';
import { StoreContext } from 'hooks/useStore';
import { Input, scheme } from 'validation/article';

export type StaticProps = { allMember: AllMember };

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
  handleClickDraft: () => void;
};

const NewArticle: FC<Props> = ({
  name,
  allMember,
  control,
  isLoading,
  handleSubmit,
  handleCancel,
  handleClickDraft,
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
          handleClickDraft={handleClickDraft}
        />
      </Container>
      <LoadingOverflow isLoading={isLoading} />
    </>
  );
};

const EnhancedNewArticle: NextPage<StaticProps> = ({ allMember }) => {
  const { store, storeDispatch } = useContext(StoreContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { draftArtcile, updateDraft, deleteDraft } = useDraftArticle();

  const { handleSubmit, control, getValues, reset } = useForm<Input>({
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
      if (!store.member) throw new Error();
      setIsLoading(true);

      await createArticle({ ...payload, name: store.member.name });
      setIsLoading(false);
      deleteDraft();
      storeDispatch({
        type: 'UPDATE',
        payload: {
          name: 'next',
          value: payload.next,
        },
      });
      void router.push('/');
    } catch (error) {
      window.alert('エラーが発生しました。');
    }
  });

  const registerDraft = () => {
    const state = getValues();
    if (state.content !== '') {
      updateDraft(state);
    } else {
      deleteDraft();
    }
  };

  const handleClickDraft = () => {
    registerDraft();
    void router.push('/');
  };

  const handleCancel = () => {
    void router.push('/');
  };

  useEffect(() => {
    if (draftArtcile && window.confirm('下書きの続きから書き始めますか？')) {
      reset(draftArtcile);
    }
    const timerId = setInterval(registerDraft, 1000 * 30); // 30秒おきに1回下書き保存する

    return () => {
      clearInterval(timerId);
    };
  }, []); // eslint-disable-line

  return (
    <NewArticle
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
      handleClickDraft={handleClickDraft}
    />
  );
};

export default EnhancedNewArticle;
