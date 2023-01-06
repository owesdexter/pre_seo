import Head from "next/head";
import { getLatestPrice } from "@/api";
import { GetServerSideProps } from "next";
import { useEffect } from "react";

type Props = {
  price: string;
  cur: string;
  base: string;
};

export default function Home({ cur, base, price }: Props) {
  const curRel = `${cur}/${base}`;

  return (
    <>
      <Head>
        <title>{`${curRel} | ${price} | 阿德虛擬貨幣交易所`}</title>
        <meta
          name="description"
          content={`${curRel} | ${price} | 阿德虛擬貨幣交易所`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="google-site-verification"
          content="oQSbYUy8YC6-tA_NzADuXGrQ5Mqje2Ln9wBj77n2PPc"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <h1>{`${curRel} | ${price} | 阿德虛擬貨幣交易所`}</h1>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  let price = "0";
  try {
    const { data } = await getLatestPrice();
    price = data[`BTC/TWD`].last_price;
  } catch (err) {
    console.log(err);
  }
  return {
    props: {
      price,
      cur: "BTC",
      base: "TWD",
    },
  };
};
