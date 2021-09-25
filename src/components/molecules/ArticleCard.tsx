import { FC } from 'react';
import Link from 'next/link';
import { Typography, Box, Card, CardActionArea } from '@mui/material';

import TypographyRowControl from 'components/atoms/TypographyRowControl';

type Props = {
  title: string;
  date: string;
  name: string;
  content: string;
  href: string;
};

const ArticleCard: FC<Props> = ({ title, date, name, content, href }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <Link href={href} passHref>
        <CardActionArea sx={{ height: '100%' }}>
          <Box display="flex" flexDirection="column" height="100%" p={1}>
            <Box mb={1.5}>
              <Typography component="b" variant="h4">
                {title}
              </Typography>
              <Box
                display="flex"
                gap={1}
                fontSize="overline.fontSize"
                color="primary"
              >
                <time>{date}</time>
                <span>{name}</span>
              </Box>
            </Box>
            <Box flex="1 1 auto" mb={1.5}>
              <TypographyRowControl maxRow={2}>{content}</TypographyRowControl>
            </Box>
            <Typography align="right" variant="body2">
              続きを読む
            </Typography>
          </Box>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default ArticleCard;
