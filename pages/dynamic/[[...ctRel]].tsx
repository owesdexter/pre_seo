import { GetServerSideProps } from "next";
import { getTradeDataByParams } from "@/utils";
import { TTradeData, TAPITradeData } from "@/types";
import { useEffect, ReactElement } from "react";
import SSRLayout from "@/components/layout/ssr";

type Props = {
  tradeData: TTradeData;
  children: ReactElement;
};

export default function CtRel({ tradeData }: Props) {
  const { target, base } = tradeData;
  useEffect(() => {
    setTimeout(() => {
      // if (window.location.host === process.env.HOSTNAME) {
      window.location.replace(`https://ace.io/trade/${target}/${base}`);
      // }
    }, 1000);
  }, [target, base]);
  return <></>;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {
      tradeData: await getTradeDataByParams(params),
    },
  };
};

CtRel.getLayout = function getLayout(page: ReactElement) {
  return (
    <SSRLayout props={{ ...page.props, isDynamic: true }}>{page}</SSRLayout>
  );
};