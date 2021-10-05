import { FC, useContext } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import {
  Button,
  Box,
  Paper,
  TextField,
  Container,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useForm, Control, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, scheme } from 'validation/setting';
import { updateSetting } from 'domains/microCMS/services/setting';
import { MemberContext } from 'hooks/useMemberStore';

type Props = {
  control: Control<Input>;
  handleSubmit: () => void;
  handleCancel: () => void;
};

const Setting: FC<Props> = ({ control, handleSubmit, handleCancel }) => {
  return (
    <>
      <Head>
        <title>設定 | 3-5 9人ブログ</title>
        <meta name="description" content="設定 3-5 9人ブログ" />
      </Head>
      <Container>
        <Typography variant="h1" sx={{ mb: 5 }}>
          設定
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
              name="dispName"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  id={field.name}
                  type="text"
                  label="表示名"
                  value={field.value}
                  size="small"
                  fullWidth
                  helperText={fieldState.error?.message ?? ''}
                  error={!!fieldState.error?.message}
                  onChange={field.onChange}
                />
              )}
            />
          </Paper>
          <Box display="flex" flexDirection="row-reverse">
            <Box ml={1}>
              <Button variant="contained" color="primary" type="submit">
                保存
              </Button>
            </Box>
            <Button variant="outlined" color="primary" onClick={handleCancel}>
              キャンセル
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
};

const EnhancedSetting: NextPage = () => {
  const context = useContext(MemberContext);
  const router = useRouter();
  const query = router.query as { next?: string };

  const { handleSubmit, control } = useForm<Input>({
    defaultValues: {
      name: context?.member?.name ?? '',
      dispName: context?.member?.dispName ?? '',
    },
    resolver: yupResolver(scheme),
  });

  const _handleSubmit = handleSubmit(async (payload) => {
    try {
      if (!context || !context.member) throw new Error();

      await updateSetting({ id: context.member.id, payload });
      context.memberDispatch({
        type: 'SET',
        member: { id: context.member.id, ...payload },
      });
      router.push(query.next ?? '/');
    } catch (error) {
      window.alert('エラーが発生しました。');
    }
  });

  const handleCancel = () => {
    router.push(query.next ?? '/');
  };

  return (
    <Setting
      control={control}
      handleSubmit={_handleSubmit}
      handleCancel={handleCancel}
    />
  );
};

export default EnhancedSetting;
