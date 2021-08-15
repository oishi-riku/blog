import { jaJP } from '@material-ui/core/locale';
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme(
  {
    typography: {
      fontFamily: [
        'Roboto',
        'Noto Sans JP',
        'Helvetica',
        'Arial',
        'sans-serif',
      ].join(','),
    },
  },
  jaJP
);

export default theme;
