import "../styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* <link rel="icon" href="/favicon.ico" sizes="16x16"/> */}
        <link rel="icon" href="/PRV.png" sizes="16x16" type="image/png"/>
        <title>ShiFuMi</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
