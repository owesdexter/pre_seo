import { GetServerSideProps } from "next";
import { getLatestPrice } from "@/api";
import { TTradeData, TAPITradeData } from "@/types";
import { ReactElement } from "react";
import SSRLayout from "@/components/layout/ssr";

export default function CtRel() {
  return <></>;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let tradeData: TTradeData = {
    base: "BTC",
    target: "TWD",
    baseVolume: "0",
    lastPrice: "0",
    quoteVolume: "0",
  };

  const { ctRel } = (params as { ctRel: string[] }) ?? [];
  const [target, base] =
    ctRel && ctRel.length === 2
      ? ctRel.map((el) => el.toUpperCase())
      : ["BTC", "TWD"];

  try {
    const { data } = await getLatestPrice();
    if (data && data[`${target}/${base}`]) {
      let currentCtRelInfo = data[`${target}/${base}`] as TAPITradeData;
      tradeData = {
        base,
        target,
        baseVolume: currentCtRelInfo.base_volume,
        lastPrice: currentCtRelInfo.last_price,
        quoteVolume: currentCtRelInfo.quote_volume,
      };
    }
  } catch (err) {
    console.log(err);
  }
  return {
    props: {
      tradeData,
      target,
      base,
    },
  };
};

CtRel.getLayout = function getLayout(page: ReactElement) {
  return (
    <SSRLayout props={{ ...page.props, isDynamic: true }}>{page}</SSRLayout>
  );
};
