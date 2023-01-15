import CommonHead from "@/components/layout/head";
import Link from "next/link";
import { uniq } from "ramda";
import { GetServerSideProps } from "next";
import { getLatestPrice } from "@/api";
import { hotCtRel } from "@/constant";

type TAllCtRel = {
  allCtRelList: string[];
};

const Home = ({ allCtRelList }: TAllCtRel) => {
  return (
    <>
      <CommonHead
        description="阿德虛擬貨幣交易所提供新台幣購買虛擬貨幣，如比特幣(Bitcoin/BTC)、以太幣(ETH/Ethereum)、泰達幣/穩定幣(USDT)等主流幣種。"
        keywords=""
      />
      <main className="title">
        <h1>{`${process.env.NEXT_PUBLIC_TITLE} 首頁`}</h1>
        <h2>{`BTC USDT Bitcoin BNB`}</h2>
        <ul>
          {allCtRelList.map((el, idx) => (
            <li key={el} style={{ listStyle: "none", marginBottom: "12px" }}>
              <Link href={`/trade/${el}`}>{`${idx + 1}. ${el.replace(
                "/",
                " "
              )}`}</Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  let allCtRelList: string[] = [];

  try {
    const { data } = await getLatestPrice();
    allCtRelList = uniq(hotCtRel.concat(Object.keys(data) ?? []));
  } catch (err) {
    console.log(err);
  }
  return {
    props: {
      allCtRelList,
    },
  };
};

export default Home;
