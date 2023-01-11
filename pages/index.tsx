import CommonHead from "@/components/layout/head";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { getLatestPrice } from "@/api";
import { ssrPageList } from "@/constant";

type TAllCtRel = {
  allCtRelList: string[];
};

const Home = ({ allCtRelList }: TAllCtRel) => {
  const singleFileSSRList = "bbb";
  return (
    <>
      <CommonHead />
      <main className="title">
        <h1>{`${process.env.NEXT_PUBLIC_TITLE} 首頁`}</h1>
        <h2>{`BTC USDT Bitcoin BNB`}</h2>
        <p>Static Routes</p>
        <ul>
          {ssrPageList.map((el) => (
            <li key={el}>
              <Link href={`/trade/${el}`}>{el}</Link>
            </li>
          ))}
        </ul>
        <br />
        <p>Dynamic Routes</p>
        <ul>
          {allCtRelList.map((el, idx) => (
            <li key={el} style={{ listStyle: "none" }}>
              <Link href={`/dynamic/${el}`}>{`${idx + 1}. ${el}`}</Link>
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
