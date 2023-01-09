import { getLatestPrice } from "@/api";
import { GetServerSideProps } from "next";
import CommonHead from "@/components/layout/head";

type Props = {
  price: string;
  ctRel: string;
};

export default function CtRel({ ctRel, price }: Props) {
  const title = `${ctRel} | ${price} | ${process.env.NEXT_PUBLIC_TITLE}`;
  const addingKeyword = `ssr generate dexter owesdexter`;

  return (
    <>
      <CommonHead
        title={`${title} ${addingKeyword}`}
        description={`${title} ${addingKeyword}`}
      >
        <>
          <meta
            name="description"
            content={`${process.env.NEXT_PUBLIC_TITLE} ${addingKeyword}`}
          />
          <title>{title}</title>
        </>
      </CommonHead>
      <main className="main">
        {addingKeyword}
        <h1>{title}</h1>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  console.log(params);
  let price = "0";
  // const { ctRel } = (params as { ctRel: string }) ?? "BTC_TWD";
  // let ctRelKey = ctRel ? ctRel.replace("_", "/") : "BTC/TWD";
  try {
    const { data } = await getLatestPrice();
    price =
      data && data[`BTC/TWD`]?.last_price ? data[`BTC/TWD`].last_price : "0";
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
