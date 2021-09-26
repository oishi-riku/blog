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

import { useRouter } from 'next/router';
import { useForm, Control, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, scheme } from 'validation/article';
import { createArticle } from 'domains/microCMS/services/article';

import Head from 'next/head';

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
                    <MenuItem value={1}>みちひと</MenuItem>
                    <MenuItem value={2}>さわき</MenuItem>
                    <MenuItem value={3}>たくや</MenuItem>
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
