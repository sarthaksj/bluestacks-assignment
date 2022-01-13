import Layout from "../Layout";
import { Fragment } from "react";
import Script from 'next/script';
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Script
        src="https://kit.fontawesome.com/51eee32d4c.js"
        crossOrigin="anonymous" />
      <Layout main={<Component {...pageProps} />} />
    </Fragment>

  );
}

export default MyApp;
