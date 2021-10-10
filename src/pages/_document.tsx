import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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
          <link rel="manifest" href="/manifest.webmanifest" />
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
