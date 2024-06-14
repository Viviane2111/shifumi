import "../styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="ShiFuMi" content="Une application créée avec Next.js" />
        <link rel="icon" href="./PRV.png" sizes="16x16" type="image/png"/>
        <title>ShiFuMi</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
