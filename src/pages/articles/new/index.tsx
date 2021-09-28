import { useContext } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import {
  Container,
  Button,
  Typography,
  Box,
  Paper,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
  FormControl,
} from '@mui/material';
import { MemberContext } from 'context/context';
import { useRouter } from 'next/router';
import { useForm, Control, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, scheme } from 'validation/article';
import { AllMember } from 'domains/microCMS/models/member';
import { createArticle } from 'domains/microCMS/services/article';
import { getAllMember } from 'domains/microCMS/services/member';

import Head from 'next/head';

type Props = {
  name: string | null;
  allMember: AllMember;
  control: Control<Input>;
  handleSubmit: () => void;
};

const BASE_ENDPOINT = process.env.NEXT_PUBLIC_MICRO_CMS_BASE_ENDPOINT || '';

const NewArticle: NextPage<Props> = ({
  name,
  allMember,
  control,
  handleSubmit,
}) => {
  return (
    <>
      <Head>
        <title>新規作成 | 3-5 9人ブログ</title>
        <meta name="description" content="3-5 9人ブログ 新規作成" />
      </Head>
      <Container>
        <Typography variant="h1" sx={{ mb: 5 }}>
          新規作成
        </Typography>
        <form onSubmit={handleSubmit}>
          <Paper
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              mb: 3,
              p: 2,
            }}
          >
            <TextField
              type="text"
              label="投稿者"
              value={name ?? ''}
              size="small"
              disabled
              fullWidth
            />
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  id={field.name}
                  type="text"
                  label="タイトル"
                  value={field.value}
                  size="small"
                  fullWidth
                  helperText={fieldState.error?.message ?? ''}
                  error={!!fieldState.error?.message}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              name="content"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  id={field.name}
                  label="本文"
                  value={field.value}
                  size="small"
                  fullWidth
                  multiline
                  rows={15}
                  helperText={fieldState.error?.message ?? ''}
                  error={!!fieldState.error?.message}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              name="next"
              control={control}
              render={({ field, fieldState }) => (
                <FormControl
                  size="small"
                  fullWidth
                  error={!!fieldState.error?.message}
                >
                  <InputLabel>次の人</InputLabel>
                  <Select
                    id={field.name}
                    label="次の人"
                    onChange={field.onChange}
                    value={field.value}
                  >
                    {allMember.contents.map((m) => (
                      <MenuItem key={m.id} value={m.name}>
                        {m.dispName}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {fieldState.error?.message ?? ''}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Paper>
          <Box
            display="flex"
            flexDirection="row-reverse"
            justifyContent="right"
          >
            <Box ml={1}>
              <Button variant="contained" color="primary" type="submit">
                保存
              </Button>
            </Box>
            <Link href="/" passHref>
              <Button variant="outlined" color="primary">
                キャンセル
              </Button>
            </Link>
          </Box>
        </form>
      </Container>
    </>
  );
};

const EnhancedNewArticle: NextPage<{ allMember: AllMember }> = ({
  allMember,
}) => {
  const member = useContext(MemberContext);
  const router = useRouter();
  console.log(member?.name);

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
      if (!member) throw new Error();

      await createArticle({ ...payload, name: member.name });
      router.push('/');
    } catch (error) {
      window.alert('エラーが発生しました。');
    }
  });

  return (
    <NewArticle
      name={member?.dispName ?? null}
      allMember={allMember}
      control={control}
      handleSubmit={_handleSubmit}
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
