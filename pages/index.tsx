import CommonHead from "@/components/layout/head";
import RedirectComp from "@/components/redirectComp";
import Link from "next/link";
import { uniq } from "ramda";
import { GetServerSideProps } from "next";
import { getLatestPrice } from "@/api";
import { hotCtRels } from "@/constant";

type TAllCtRel = {
  allCtRelList: string[];
};

const Home = ({ allCtRelList }: TAllCtRel) => {
  return (
    <>
      <CommonHead />
      <main>
        <div
          className={
            process.env.NEXT_PUBLIC_ENV !== "dev" ? "hide-content" : ""
          }
        >
          <h1>{`${process.env.NEXT_PUBLIC_TITLE}`}</h1>
          <h2>{`BTC USDT Bitcoin BNB ETH Ethereum`}</h2>
          <ul>
            {allCtRelList.map((el, idx) => (
              <li key={el} style={{ listStyle: "none", marginBottom: "12px" }}>
                <Link href={`/trade/${el}`}>{`${idx + 1}. ${el}`}</Link>
              </li>
            ))}
          </ul>
          <RedirectComp
            url={process.env.NEXT_PUBLIC_REDIRECT_HOST ?? ""}
            label={process.env.NEXT_PUBLIC_TITLE}
          />
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  let allCtRelList: string[] = [];
  try {
    const { data } = await getLatestPrice();
    allCtRelList = uniq(hotCtRels.concat(Object.keys(data) ?? []));
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
