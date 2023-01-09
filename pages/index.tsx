import CommonHead from "@/components/layout/head";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { getLatestPrice } from "@/api";

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
        <ul>
          {allCtRelList.map((el) => (
            <li key={el}>
              <Link href={`/trade/${el}`}>{el}</Link>
            </li>
          ))}
          <li>
            <Link href={`/singleSSR/${singleFileSSRList}`}>
              {singleFileSSRList}
            </Link>
          </li>
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
