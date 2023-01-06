import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { getLatestPrice } from "@/api";
import { GetServerSideProps } from "next";
import { useEffect } from "react";

type Props = {
  price: string;
};

export default function Home({ price }: Props) {
  // useEffect(() => {
  //   window.location.href = "https://ace.io/";
  // }, []);
  return (
    <>
      <Head>
        <title>阿德虛擬貨幣交易所</title>
        <meta name="description" content="阿德虛擬貨幣交易所" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="google-site-verification"
          content="oQSbYUy8YC6-tA_NzADuXGrQ5Mqje2Ln9wBj77n2PPc"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://pre-seo.vercel.app" />
      </Head>
      <main className={styles.main}>
        <h1>我是阿德，首頁</h1>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data } = await getLatestPrice();
  } catch (err) {
    console.log(err);
  }
  return {
    props: {
      cur: "BTC",
      base: "TWD",
    },
  };
};
