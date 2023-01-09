import { getLatestPrice } from "@/api";
import { GetServerSideProps } from "next";
import CommonHead from "@/components/layout/head";

type Props = {
  price: string;
  ctRel: string;
};

export default function CtRel({ ctRel, price }: Props) {
  const title = `${ctRel} | ${price} | ${process.env.NEXT_PUBLIC_TITLE}`;

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
        HIHI
        <h1>{title}</h1>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  console.log(params);
  let price = "0";
  const { ctRel } = (params as { ctRel: string }) ?? "BTC_TWD";
  let ctRelKey = ctRel ? ctRel.replace("_", "/") : "BTC/TWD";
  try {
    const { data } = await getLatestPrice();
    price =
      data && data[`${ctRelKey}`]?.last_price
        ? data[`${ctRelKey}`].last_price
        : "0";
  } catch (err) {
    console.log(err);
  }
  return {
    props: {
      price,
      ctRel: "HIHI",
    },
  };
};
