import { GetServerSideProps } from "next";
import { getTradeDataByParams } from "@/utils";
import { TTradeData } from "@/types";
import { ReactElement, useMemo } from "react";
import CommonHead from "@/components/layout/head";
import { getDate } from "@/utils";
import { UNKNOWN, DEFAULT_TARGET, DEFAULT_BASE } from "@/constant";

type Props = {
  tradeData: TTradeData;
  children: ReactElement;
};

export default function CtRel({ tradeData }: Props) {
  const { base, target, lastPrice, changeRate, baseVolume, quoteVolume } =
    tradeData;
  const ctRelString =
    target.includes(UNKNOWN) || target.includes(UNKNOWN)
      ? `${DEFAULT_TARGET}/${DEFAULT_BASE}`
      : `${target}/${base}`;

  const metaData =
    lastPrice !== UNKNOWN
      ? {
          title: `${ctRelString} | ${lastPrice} | ${process.env.NEXT_PUBLIC_TITLE}`,
          description: `${getDate(
            new Date()
          )} ${target} 的即時價格是每 ${ctRelString} $ ${lastPrice}，24 小時交易量為 ${baseVolume} ${target}，漲跌幅為 ${changeRate} ％。`,
          keywords: `${target} ${base} ${target.toLowerCase()} ${base.toLowerCase()} 走勢 匯率 換算 漲跌幅`,
        }
      : {
          title: `${ctRelString} | 即時價格 | ${process.env.NEXT_PUBLIC_TITLE}`,
          description: `查看 ${ctRelString} 即時價格、漲跌幅與 24 小時交易量`,
          keywords: `${DEFAULT_TARGET} ${DEFAULT_BASE} ${DEFAULT_TARGET.toLowerCase()} ${DEFAULT_BASE.toLowerCase()} 走勢 匯率 換算 漲跌幅`,
        };

  const getRedirectUrl = () => {
    let redirectUrl = `${process.env.NEXT_PUBLIC_REDIRECT_HOST}/trade`;
    if (lastPrice !== UNKNOWN) {
      redirectUrl = `${process.env.NEXT_PUBLIC_REDIRECT_HOST}/trade/${ctRelString}`;
    }
    return redirectUrl;
  };

  return (
    <>
      <CommonHead
        title={metaData.title}
        description={metaData.description}
        ctRelStr={ctRelString}
        reDirectUrl={getRedirectUrl()}
        reWriteCanonical={`${process.env.NEXT_PUBLIC_HOST}/meta/mana-twd`}
        keywords={metaData.keywords}
        useMetaRedirect={true}
      />
      <main className="main">
        <div
          className={
            process.env.NEXT_PUBLIC_ENV !== "dev" ? "hide-content" : ""
          }
        >
          <h1>{metaData.keywords}</h1>
          <h2>{metaData.keywords}</h2>
          <table>
            <thead>
              <tr>
                <th>最新價格</th>
                <th>漲跌幅</th>
                <th>{`24hr 交易量 (${target})`}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{lastPrice}</td>
                <td>{`${changeRate} %`}</td>
                <td>{baseVolume}</td>
              </tr>
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
      tradeData: await getTradeDataByParams({ ctRel: ["MANA", "TWD"] }),
    },
  };
};
