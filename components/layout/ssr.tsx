import { useEffect, ReactElement } from "react";
import { getDate } from "@/utils";
import { TTradeData } from "@/types";
import CommonHead from "@/components/layout/head";

type Props = {
  props: {
    tradeData: TTradeData;
    isDynamic?: boolean;
  };
  children: ReactElement;
};

export default function SSRLayout({
  props: { tradeData, isDynamic },
  children,
}: Props) {
  const { base, target, lastPrice, baseVolume, quoteVolume } = tradeData;
  const ctRelString = `${target}/${base}`;
  const keywords = `${target} ${base} ${target.toLowerCase()} ${base.toLowerCase()} 走勢 匯率 換算`;
  return (
    <>
      <CommonHead
        title={`${ctRelString} | ${tradeData.lastPrice} | ${process.env.NEXT_PUBLIC_TITLE}`}
        description={`${getDate(
          new Date()
        )} 今天 ${target} 的即時價格是每 ${ctRelString} $ ${lastPrice}，24 小時交易量為 ${baseVolume} ${target}。ETH 在過去 24 小時內的價格變動為 +5.38%。`}
        ctRelStr={ctRelString}
        isDynamic={isDynamic}
      />
      <main className="main">
        <h1>{keywords}</h1>
        <h2 style={{ display: "none" }}>{keywords}</h2>
        <p>
          title:
          <br />
          {`${ctRelString} | ${tradeData.lastPrice} | ${process.env.NEXT_PUBLIC_TITLE}`}
        </p>
        <p>
          Description:
          <br />
          {`${getDate(
            new Date()
          )} 今天 ${target} 的即時價格是每 ${ctRelString} $ ${lastPrice}，24 小時交易量為 ${baseVolume}${target}。ETH 在過去 24 小時內的價格變動為 +5.38%。`}
        </p>
        {children}
      </main>
    </>
  );
}
