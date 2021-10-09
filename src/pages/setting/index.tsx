import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Box,
  Paper,
  TextField,
  Container,
  Typography,
} from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, useContext, useState } from 'react';
import { useForm, Control, Controller } from 'react-hook-form';
import LoadingOverflow from 'components/atoms/LoadingOverflow';
import { updateSetting } from 'domains/microCMS/services/setting';
import { StoreContext } from 'hooks/useStore';
import { Input, scheme } from 'validation/setting';

type Props = {
  control: Control<Input>;
  isLoading: boolean;
  handleSubmit: () => void;
  handleCancel: () => void;
};

const Setting: FC<Props> = ({
  control,
  isLoading,
  handleSubmit,
  handleCancel,
}) => {
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
      <LoadingOverflow isLoading={isLoading} />
    </>
  );
};

const EnhancedSetting: NextPage = () => {
  const { store, storeDispatch } = useContext(StoreContext);
  const router = useRouter();
  const query = router.query as { next?: string };
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, control } = useForm<Input>({
    defaultValues: {
      name: store.member?.name ?? '',
      dispName: store.member?.dispName ?? '',
    },
    resolver: yupResolver(scheme),
  });

  const _handleSubmit = handleSubmit(async (payload) => {
    try {
      if (!store.member) throw new Error();
      setIsLoading(true);

      await updateSetting({ id: store.member.id, payload });
      storeDispatch({
        type: 'UPDATE',
        payload: {
          name: 'member',
          value: { id: store.member.id, ...payload },
        },
      });
      setIsLoading(false);
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
      isLoading={isLoading}
      handleSubmit={_handleSubmit}
      handleCancel={handleCancel}
    />
  );
};

export default EnhancedSetting;
