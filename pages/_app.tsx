import type { AppProps } from "next/app";
import type { NextPage } from "next";
import React, { ReactElement, ReactNode } from "react";
import NextHead from "next/head";
import "../styles/index.scss";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement, payload?: any) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: any) => page);
  return (
    <>
      <NextHead>
        <link rel="icon" href="/favicon.ico" />
      </NextHead>
      <div className="bg-black">{getLayout(<Component {...pageProps} />)}</div>
    </>
  );
}
