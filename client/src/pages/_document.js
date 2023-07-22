import { Html, Head, Main, NextScript, MetaData } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <title>Stocktrackr</title>
        <meta
          name='description'
          content='This is the description of my page.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
