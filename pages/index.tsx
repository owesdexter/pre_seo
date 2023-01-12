import CommonHead from "@/components/layout/head";
import Link from "next/link";
import { useEffect } from "react";
import { GetServerSideProps } from "next";
import { getLatestPrice } from "@/api";
import { ssrPageList } from "@/constant";

type TAllCtRel = {
  allCtRelList: string[];
};

const Home = ({ allCtRelList }: TAllCtRel) => {
  // useEffect(() => {
  //   setTimeout(() => {
  //     window.location.replace(`${process.env.NEXT_PUBLIC_REDIRECT_HOST}`);
  //   }, 5000);
  // }, []);
  return (
    <>
      <CommonHead
        description="阿德虛擬貨幣交易所提供新台幣購買虛擬貨幣，如比特幣(Bitcoin/BTC)、以太幣(ETH/Ethereum)、USDT(泰達幣)等主流幣種。"
        keywords=""
      />
      <main className="title">
        <h1>{`${process.env.NEXT_PUBLIC_TITLE} 首頁`}</h1>
        <h2>{`BTC USDT Bitcoin BNB`}</h2>
        <p>Static Routes</p>
        <ul>
          {ssrPageList.map((el) => (
            <li key={el} style={{ listStyle: "none", marginBottom: "12px" }}>
              <Link href={`/trade/${el.toLowerCase()}`}>
                {el.replace("/", " ")}
              </Link>
            </li>
          ))}
        </ul>
        <br />
        <p>Dynamic Routes</p>
        <ul>
          {allCtRelList.map((el, idx) => (
            <li key={el} style={{ listStyle: "none", marginBottom: "12px" }}>
              <Link href={`/dynamic/${el}`}>{`${idx + 1}. ${el.replace(
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
    allCtRelList = Object.keys(data);
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
