import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useForm, Control, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, scheme } from '@validation/member';
import Head from 'next/head';

import Layout from '@components/templates/Layout';
import Container from '@components/templates/Container';
import Heading from '@components/atoms/Heading';
import Button from '@components/atoms/Button';
import Box from '@components/atoms/Box';
import FormInput from '@components/atoms/FormInput';
import { setMember } from '@helper/member';
import styles from '@styles/pages/login/Index.module.scss';

type Props = {
  control: Control<Input>;
  handleSubmit: () => void;
};

const MEMBER = (process.env.NEXT_PUBLIC_MEMBER || '').split(',');

const Login: NextPage<Props> = ({ control, handleSubmit }) => {
  return (
    <>
      <Head>
        <title>ログイン | 3-5 9人ブログ</title>
        <meta name="description" content="3-5 9人ブログ ログイン" />
      </Head>
      <Layout isHeader={false}>
        <Container>
          <div className={styles.root}>
            <Box>
              <Heading level={1} align="center">
                ログイン
              </Heading>
              <form onSubmit={handleSubmit}>
                <Box mb={2}>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field, fieldState }) => (
                      <FormInput
                        id={field.name}
                        type="text"
                        label="名前"
                        value={field.value}
                        helperText={fieldState.error?.message ?? ''}
                        isError={!!fieldState.error?.message}
                        handleChange={field.onChange}
                      />
                    )}
                  />
                </Box>
                <Box display="flex" justify="right">
                  <Button variant="contained" color="primary" type="submit">
                    ログイン
                  </Button>
                </Box>
              </form>
            </Box>
          </div>
        </Container>
      </Layout>
    </>
  );
};

const EnhancedLogin: NextPage = () => {
  const router = useRouter();
  const { handleSubmit, control } = useForm<Input>({
    resolver: yupResolver(scheme),
    defaultValues: {
      name: '',
    },
    context: {
      members: MEMBER,
    },
  });

  const _handleSubmit = handleSubmit((payload) => {
    setMember(payload.name);
    router.push('/');
  });

  return <Login control={control} handleSubmit={_handleSubmit} />;
};

export default EnhancedLogin;
