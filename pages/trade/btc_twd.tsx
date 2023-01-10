import { GetServerSideProps } from "next";
import { getLatestPrice } from "@/api";
import { getDate, getTradeDataByParams } from "@/utils";
import { TTradeData, TAPITradeData } from "@/types";
import CommonHead from "@/components/layout/head";

type Props = {
  tradeData: TTradeData;
  price: string;
  ctRelString: string;
  target: string;
  base: string;
};

export default function CtRel({ tradeData }: Props) {
  const { base, target, lastPrice, baseVolume } = tradeData;
  const ctRelString = `${target}/${base}`;
  const keywords = `${target} ${base} ${target.toLowerCase()} ${base.toLowerCase()} 走勢 匯率 換算`;
  return (
    <>
      <CommonHead
        title={`${ctRelString} | ${tradeData.lastPrice} | ${process.env.NEXT_PUBLIC_TITLE}`}
        description={`${getDate(
          new Date()
        )} 今天 ${target} 的即時價格是每 ${ctRelString} $ ${lastPrice}，24 小時交易量為 ${baseVolume}${base}。`}
        ctRelStr={ctRelString}
      />
      <main className="main">
        <h1>{keywords}</h1>
        <h2 style={{ display: "none" }}>{keywords}</h2>
        <p>
          title:
          <hr />
          {`${ctRelString} | ${tradeData.lastPrice} | ${process.env.NEXT_PUBLIC_TITLE}`}
        </p>
        <p>
          Description:
          <hr />
          {`${getDate(
            new Date()
          )} 今天 ${target} 的即時價格是每 ${ctRelString} $ ${lastPrice}，24 小時交易量為 ${baseVolume}${base}。`}
        </p>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  resolvedUrl,
}) => {
  return {
    props: {
      tradeData: await getTradeDataByParams(resolvedUrl),
    },
  };
};
