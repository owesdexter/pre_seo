import { GetServerSideProps } from "next";
import { getLatestPrice } from "@/api";
import { getDate } from "@/utils";
import { TTradeData, TAPITradeData } from "@/types";
import CommonHead from "@/components/layout/head";

type Props = {
  tradeData: TTradeData;
  price: string;
  ctRelString: string;
  target: string;
  base: string;
};

export default function CtRel({ target, base, tradeData }: Props) {
  const { lastPrice, baseVolume } = tradeData;
  const ctRelString = `${target}/${base}`;
  const title = `${target}/${base} | ${tradeData.lastPrice} | ${process.env.NEXT_PUBLIC_TITLE}`;
  const keywords = `${target} ${base} ${target.toLowerCase()} ${base.toLowerCase()} 走勢 匯率 換算`;

  return (
    <>
      <CommonHead
        title={title}
        description={`${getDate(
          new Date()
        )} 今天 GST 的即時價格是每 ${ctRelString} $ ${lastPrice}，24 小時交易量為 ${baseVolume}${base}。`}
        ctRelStr={ctRelString}
      />
      <main className="main">
        <h1>{keywords}</h1>
        <h2 style={{ display: "none" }}>{keywords}</h2>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let tradeData: TTradeData = {
    baseVolume: "0",
    lastPrice: "0",
    quoteVolume: "0",
  };
  // let volume = "0";
  const { ctRel } = (params as { ctRel: string[] }) ?? [];
  const [target, base] =
    ctRel && ctRel.length === 2
      ? ctRel.map((el) => el.toUpperCase())
      : ["BTC", "TWD"];
  console.log(" ----- SSR render:", `${target}/${base}`);
  try {
    const { data } = await getLatestPrice();
    console.log(data["BTC/USDT"]);
    if (data && data[`${target}/${base}`]) {
      let currentCtRelInfo = data[`${target}/${base}`] as TAPITradeData;
      tradeData = {
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
