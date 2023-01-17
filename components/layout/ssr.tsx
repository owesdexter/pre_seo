import { useEffect, ReactElement } from "react";
import { getDate } from "@/utils";
import { TTradeData } from "@/types";
import CommonHead from "@/components/layout/head";

type Props = {
  props: {
    tradeData: TTradeData;
  };
  children: ReactElement;
};

export default function SSRLayout({ props: { tradeData }, children }: Props) {
  const { base, target, lastPrice, baseVolume, quoteVolume } = tradeData;
  const ctRelString = `${target}/${base}`;
  const keywords = `${target} ${base} ${target.toLowerCase()} ${base.toLowerCase()} 走勢 匯率 換算`;
  return (
    <>
      <CommonHead
        title={`${ctRelString} | ${tradeData.lastPrice} | ${process.env.NEXT_PUBLIC_TITLE}`}
        description={`${getDate(
          new Date()
        )} 今天 ${target} 的即時價格是每 ${ctRelString} $ ${lastPrice}，24 小時交易量為 ${baseVolume} ${target}。`}
        ctRelStr={ctRelString}
      />
      <main className="main">
        <h1>{keywords}</h1>
        <h2 style={{ display: "none" }}>{keywords}</h2>
        {/* <p>
          title:
          <br />
          {`${ctRelString} | ${tradeData.lastPrice} | ${process.env.NEXT_PUBLIC_TITLE}`}
        </p>
        <p>
          Description:
          <br />
          {`${getDate(
            new Date()
          )} 今天 ${target} 的即時價格是每 ${ctRelString} $ ${lastPrice}，24 小時交易量為 ${baseVolume}${target}。`}
        </p> */}
        {children}
      </main>
    </>
  );
}
