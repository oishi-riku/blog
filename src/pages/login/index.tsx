import type { NextPage } from 'next';
import { Paper, Button, Typography, Box, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useForm, Control, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, scheme } from 'validation/member';
import Head from 'next/head';

import Layout from 'components/templates/Layout';
import { setMember } from 'helper/member';

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
        <Box mt={10} mx="auto" maxWidth={700}>
          <Paper
            sx={{
              mb: 3,
              p: 2,
            }}
          >
            <Typography variant="h1" align="center" sx={{ mb: 5 }}>
              ログイン
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box mb={3}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      id={field.name}
                      type="text"
                      label="名前"
                      value={field.value}
                      size="small"
                      fullWidth
                      helperText={fieldState.error?.message ?? ''}
                      error={!!fieldState.error?.message}
                      onChange={field.onChange}
                    />
                  )}
                />
              </Box>
              <Box display="flex" justifyContent="right">
                <Button variant="contained" color="primary" type="submit">
                  ログイン
                </Button>
              </Box>
            </form>
          </Paper>
        </Box>
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
