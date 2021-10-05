import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { Paper, Button, Typography, Box, TextField } from '@mui/material';
import { useForm, Control, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import useAllMember from 'hooks/useAllMember';
import { MemberContext } from 'hooks/useMemberStore';
import { Input, scheme } from 'validation/login';
import { convertMember } from 'helper/member';

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
        <meta name="description" content="ログイン 3-5 9人ブログ" />
      </Head>
      <Box mt={10} mx="auto" px={2} maxWidth={750}>
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
                    label="名前（漢字フルネーム）"
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
            <Box display="flex" justifyContent="flex-end">
              <Button variant="contained" color="primary" type="submit">
                ログイン
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </>
  );
};

const EnhancedLogin: NextPage = () => {
  const router = useRouter();
  const { members } = useAllMember();
  const context = useContext(MemberContext);
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
    const name = convertMember(payload.name);
    if (members && name) {
      const target = members.contents.find((m) => m.name === name);

      context?.memberDispatch({
        type: 'SET',
        member: target
          ? { id: target.id, name: target.name, dispName: target.dispName }
          : null,
      });
      localStorage.setItem('MEMBER_NAME', name);
      router.push('/');
    }
  });

  return <Login control={control} handleSubmit={_handleSubmit} />;
};

export default EnhancedLogin;
