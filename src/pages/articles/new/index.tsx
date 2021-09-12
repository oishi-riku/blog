import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useForm, Control, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, scheme } from '@validation/article';
import { createArticle } from '@domains/microCMS/services/article';

import Head from 'next/head';
import Layout from '@components/templates/Layout';
import Container from '@components/templates/Container';
import Heading from '@components/atoms/Heading';
import FormInput from '@components/atoms/FormInput';
import FormTextarea from '@components/atoms/FormTextarea';
import FormSelect from '@components/atoms/FormSelect';
import Button from '@components/atoms/Button';
import ButtonLink from '@components/atoms/ButtonLink';
import Box from '@components/atoms/Box';

type Props = {
  control: Control<Input>;
  handleSubmit: () => void;
};

const NewArticle: NextPage<Props> = ({ control, handleSubmit }) => {
  return (
    <>
      <Head>
        <title>新規作成 | 3-5 9人ブログ</title>
        <meta name="description" content="3-5 9人ブログ 新規作成" />
      </Head>
      <Layout>
        <Container>
          <Heading level={1}>新規作成</Heading>
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <Controller
                name="title"
                control={control}
                render={({ field, fieldState }) => (
                  <FormInput
                    id={field.name}
                    type="text"
                    label="タイトル"
                    value={field.value}
                    helperText={fieldState.error?.message ?? ''}
                    isError={!!fieldState.error?.message}
                    handleChange={field.onChange}
                  />
                )}
              />
            </Box>
            <Box mb={2}>
              <Controller
                name="content"
                control={control}
                render={({ field, fieldState }) => (
                  <FormTextarea
                    id={field.name}
                    label="本文"
                    value={field.value}
                    row={12}
                    helperText={fieldState.error?.message ?? ''}
                    isError={!!fieldState.error?.message}
                    handleChange={field.onChange}
                  />
                )}
              />
            </Box>
            <Box mb={2}>
              <Controller
                name="next"
                control={control}
                render={({ field, fieldState }) => (
                  <FormSelect
                    id={field.name}
                    label="次の人"
                    value={field.value}
                    handleChange={field.onChange}
                    helperText={fieldState.error?.message ?? ''}
                    isError={!!fieldState.error?.message}
                    options={[
                      {
                        id: '0',
                        value: '',
                        text: '',
                      },
                      {
                        id: '1',
                        value: 'michihito',
                        text: 'みちひと',
                      },
                      {
                        id: '2',
                        value: 'sawaki',
                        text: 'さわき',
                      },
                      {
                        id: '3',
                        value: 'takuya',
                        text: 'たくや',
                      },
                    ]}
                  />
                )}
              />
            </Box>
            <Box display="flex" direction="row-reverse" justify="right">
              <Box ml={1}>
                <Button variant="contained" color="primary" type="submit">
                  保存
                </Button>
              </Box>
              <ButtonLink variant="outlined" color="primary" href="/">
                キャンセル
              </ButtonLink>
            </Box>
          </form>
        </Container>
      </Layout>
    </>
  );
};

const EnhancedNewArticle: NextPage = () => {
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
      await createArticle(payload);
      router.push('/');
    } catch (error) {
      window.alert('エラーが発生しました。');
    }
  });

  return <NewArticle control={control} handleSubmit={_handleSubmit} />;
};

export default EnhancedNewArticle;
