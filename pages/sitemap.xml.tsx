import { getLatestPrice } from "@/api";
import { GetServerSideProps } from "next";

function generateSiteMap(data: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${process.env.NEXT_PUBLIC_HOST}</loc>
        <lastmod>2021-01-12</lastmod>
      </url>
      <url>
        <loc>${process.env.NEXT_PUBLIC_HOST}/trade/BNB_TWD</loc>
        <lastmod>2021-01-12</lastmod>
      </url>
      <url>
        <loc>${process.env.NEXT_PUBLIC_HOST}/trade/BTC_TWD</loc>
        <lastmod>2021-01-12</lastmod>
      </url>
      <url>
        <loc>${process.env.NEXT_PUBLIC_HOST}/trade/BTC_USDT</loc>
        <lastmod>2021-01-12</lastmod>
      </url>
     ${data
       .map(
         (el) => `
       <url>
          <loc>${`${process.env.NEXT_PUBLIC_HOST}/dynamic/${el}`}</loc>
          <lastmod>2021-01-12</lastmod>
       </url>
     `
       )
       .join("")}
   </urlset>
 `;
}

// Default export to prevent next.js errors
function SiteMap() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  try {
    const { data } = await getLatestPrice();
    const sitemap = generateSiteMap(Object.keys(data));

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();
  } catch (err) {
    console.log(err);
  }
  return {
    props: {},
  };
};

export default SiteMap;