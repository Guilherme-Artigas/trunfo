import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head />
      <body className="bg-green-950 bg-gradient-radial from-black p-2">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
