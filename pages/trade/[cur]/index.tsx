import { getLatestPrice } from "@/api";
import { GetServerSideProps } from "next";
import CommonHead from "@/components/layout/head";

type Props = {
  price: string;
  cur: string;
  base: string;
};

export default function BTCTWDRel({ cur, base, price }: Props) {
  const curRel = `${cur}/${base}`;
  const title = `${curRel} | ${price} | ${process.env.NEXT_PUBLIC_TITLE}`;

  return (
    <>
      <CommonHead title={title} description={title}>
        <>
          <meta
            name="description"
            content={`${process.env.NEXT_PUBLIC_TITLE}`}
          />
          <title>{`${curRel} | ${price} | 阿德虛擬貨幣交易所`}</title>
        </>
      </CommonHead>
      <main className="main">
        <h1>{title}</h1>
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
