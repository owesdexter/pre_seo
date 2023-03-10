import CommonHead from "@/components/layout/head";
import RedirectComp from "@/components/redirectComp";
import Link from "next/link";
import { useEffect } from "react";
import { uniq } from "ramda";
import { GetServerSideProps } from "next";
import { getLatestPrice } from "@/api";
import { hotCtRels } from "@/constant";

type TAllCtRel = {
  allCtRelList: string[];
};

const Home = ({ allCtRelList }: TAllCtRel) => {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ENV !== "dev") {
      window.location.replace(`${process.env.NEXT_PUBLIC_REDIRECT_HOST}`);
    }
  }, []);

  return (
    <>
      <CommonHead
        reDirectUrl={process.env.NEXT_PUBLIC_REDIRECT_HOST}
        useMetaRedirect={true}
        reWriteCanonical={`${process.env.NEXT_PUBLIC_HOST}/metatohome`}
      />
      <main>
        <div className="content-block-for-seo">
          <h1>{`導向首頁`}</h1>
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
