import Head from "next/head";
import { getLatestPrice } from "@/api";
import { GetServerSideProps } from "next";
import CommonHead from "@/components/layout/head";

type Props = {
  price: string;
  ctRelString: string;
};

export default function CtRel({ ctRelString, price }: Props) {
  const title = `${ctRelString} | ${price} | ${process.env.NEXT_PUBLIC_TITLE}`;

  return (
    <>
      <CommonHead title={title} description={title}>
        <>
          <meta
            name="description"
            content={`${process.env.NEXT_PUBLIC_TITLE}`}
          />
          <title>{title}</title>
        </>
      </CommonHead>
      <main className="main">
        <h1>{title}</h1>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let price = "0";
  const { ctRel } = (params as { ctRel: string[] }) ?? [];
  let ctRelString = ctRel && ctRel.length === 2 ? ctRel.join("/") : "BTC/TWD";
  try {
    const { data } = await getLatestPrice();
    price =
      data && data[`${ctRelString}`].last_price
        ? data[`${ctRelString}`].last_price
        : "0";
  } catch (err) {
    console.log(err);
  }
  return {
    props: {
      price,
      ctRelString,
    },
  };
};