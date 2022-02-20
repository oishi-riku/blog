import {
  Button,
  Box,
  Paper,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
  FormControl,
} from '@mui/material';
import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';

import { Input } from 'validation/article';

type Props = {
  name: string | null;
  allMember: {
    id: string;
    name: string;
    dispName: string;
  }[];
  control: Control<Input>;
  isEdit?: boolean;
  handleSubmit: () => void;
  handleCancel: () => void;
  handleClickDraft?: () => void;
};

const ArticleForm: FC<Props> = ({
  name,
  allMember,
  control,
  isEdit = false,
  handleSubmit,
  handleCancel,
  handleClickDraft,
}) => {
  return (
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
                {allMember.map((m) => (
                  <MenuItem key={m.id} value={m.name}>
                    {m.dispName}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{fieldState.error?.message ?? ''}</FormHelperText>
            </FormControl>
          )}
        />
      </Paper>
      <Box display="flex" gap={1} flexDirection="row-reverse" flexWrap="wrap">
        <Box>
          <Button variant="contained" color="primary" type="submit">
            投稿
          </Button>
        </Box>
        {!isEdit && (
          <Box>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClickDraft}
            >
              下書き保存
            </Button>
          </Box>
        )}
        <Box>
          <Button color="primary" onClick={handleCancel}>
            キャンセル
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default ArticleForm;
