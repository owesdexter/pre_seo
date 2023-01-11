import { ReactElement } from "react";
import { GetServerSideProps } from "next";
import { getTradeDataByParams } from "@/utils";
import SSRLayout from "@/components/layout/ssr";

export default function CtRel() {
  return <></>;
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

CtRel.getLayout = function getLayout(page: ReactElement) {
  return <SSRLayout props={{ ...page.props }}>{page}</SSRLayout>;
};
