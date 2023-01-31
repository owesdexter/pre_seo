import { GetServerSideProps } from "next";
import { getTradeDataByParams } from "@/utils";
import { TTradeData, TAPITradeData } from "@/types";
import { useEffect, ReactElement } from "react";
import CommonHead from "@/components/layout/head";
import { getDate } from "@/utils";

type Props = {
  tradeData: TTradeData;
  children: ReactElement;
};

export default function CtRel({ tradeData }: Props) {
  const { base, target, lastPrice, changeRate, baseVolume, quoteVolume } =
    tradeData;
  const ctRelString = `${target}/${base}`;
  const keywords = `${target} ${base} ${target.toLowerCase()} ${base.toLowerCase()} 走勢 匯率 換算`;
  // useEffect(() => {
  //   if (process.env.NEXT_PUBLIC_ENV !== "dev") {
  //     window.location.replace(
  //       `${process.env.NEXT_PUBLIC_REDIRECT_HOST}/trade/${target}/${base}`
  //     );
  //   }
  // }, [target, base]);
  return (
    <>
      <CommonHead
        title={`${ctRelString} | ${tradeData.lastPrice} | ${process.env.NEXT_PUBLIC_TITLE}`}
        description={`${getDate(
          new Date()
        )} ${target} 的即時價格是每 ${ctRelString} $ ${lastPrice}，24 小時交易量為 ${baseVolume} ${target}。`}
        ctRelStr={ctRelString}
        keywords={keywords}
      />
      <main className="main">
        <div className="content-block-for-seo">
          <ul className="info-list">
            <li className="info-list-item"></li>
          </ul>
          <h1>{keywords}</h1>
          <h2 style={{ display: "none" }}>{keywords}</h2>
          <p>
            {`${ctRelString} | ${tradeData.lastPrice} | ${process.env.NEXT_PUBLIC_TITLE}`}
          </p>
          <p>
            {`${getDate(
              new Date()
            )} ${target} 的即時價格是每 ${ctRelString} $ ${lastPrice}，24 小時交易量為 ${baseVolume}${target}。`}
          </p>

          <table>
            <thead>
              <th>最新價格</th>
              <th>漲跌幅</th>
              <th>{`24hr 交易量 (${target})`}</th>
            </thead>
            <tbody>
              <td>{lastPrice}</td>
              <td>{changeRate}</td>
              <td>{baseVolume}</td>
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {
      tradeData: await getTradeDataByParams(params),
    },
  };
};
