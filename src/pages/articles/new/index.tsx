import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '@components/templates/Layout';
import Container from '@src/components/templates/Container';
import Heading from '@components/atoms/Heading';
import FormInput from '@components/atoms/FormInput';
import FormTextarea from '@components/atoms/FormTextarea';
import FormSelect from '@components/atoms/FormSelect';
import Button from '@components/atoms/Button';
import ButtonLink from '@components/atoms/ButtonLink';
import Box from '@components/atoms/Box';

const NewArticle: NextPage = () => {
  return (
    <>
      <Head>
        <title>新規作成 | 3-5 9人ブログ</title>
        <meta name="description" content="3-5 9人ブログ 新規作成" />
      </Head>
      <Layout>
        <Container>
          <Heading level={1}>新規作成</Heading>
          <form>
            <Box mb={2}>
              <FormInput id="title" type="text" label="タイトル" />
            </Box>
            <Box mb={2}>
              <FormTextarea id="content" label="本文" row={12} />
            </Box>
            <Box mb={2}>
              <FormSelect
                id="next"
                label="次の人"
                options={[
                  {
                    id: '1',
                    value: 'michihito',
                    text: 'みちひと',
                  },
                  {
                    id: '2',
                    value: 'sawaki',
                    text: 'さわき',
                  },
                  {
                    id: '3',
                    value: 'takuya',
                    text: 'たくや',
                  },
                ]}
              />
            </Box>
            <Box display="flex" direction="row-reverse" justify="right">
              <Box ml={1}>
                <Button variant="contained" color="primary" type="submit">
                  保存
                </Button>
              </Box>
              <ButtonLink variant="outlined" color="primary" href="/">
                キャンセル
              </ButtonLink>
            </Box>
          </form>
        </Container>
      </Layout>
    </>
  );
};

export default NewArticle;
