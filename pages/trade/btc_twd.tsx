import { ReactElement, useEffect } from "react";
import { GetServerSideProps } from "next";
import { getTradeDataByUrl } from "@/utils";
import SSRLayout from "@/components/layout/ssr";
import { TTradeData } from "@/types";

type Props = {
  tradeData: TTradeData;
  children: ReactElement;
};

export default function CtRel({ tradeData }: Props) {
  const { target, base } = tradeData;
  // useEffect(() => {
  //   setTimeout(() => {
  //     window.location.replace(`${process.env.NEXT_PUBLIC_REDIRECT_HOST}`);
  //   }, 5000);
  // }, []);
  return <></>;
}

export const getServerSideProps: GetServerSideProps = async ({
  resolvedUrl,
}) => {
  return {
    props: {
      tradeData: await getTradeDataByUrl(resolvedUrl),
    },
  };
};

CtRel.getLayout = function getLayout(page: ReactElement) {
  return <SSRLayout props={{ ...page.props }}>{page}</SSRLayout>;
};
