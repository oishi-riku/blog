import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ja">
        <Head>
          <meta name="robots" content="noindex" />
          <link rel="preconnect" href="https://fonts.gstatic.com"></link>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Noto+Sans+JP:wght@400,500,700&family=Roboto:wght@400,500,700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
