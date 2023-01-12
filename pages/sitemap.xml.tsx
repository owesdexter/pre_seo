import { getLatestPrice } from "@/api";
import { GetServerSideProps } from "next";
import { getDate } from "@/utils";
const UPDATE_DATE = getDate(new Date());

function generateSiteMap(data: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${process.env.NEXT_PUBLIC_HOST}</loc>
        <lastmod>${UPDATE_DATE}</lastmod>
      </url>
      <url>
        <loc>${process.env.NEXT_PUBLIC_HOST}/static/bnb_twd</loc>
        <lastmod>${UPDATE_DATE}</lastmod>
      </url>
      <url>
        <loc>${process.env.NEXT_PUBLIC_HOST}/static/btc_twd</loc>
        <lastmod>${UPDATE_DATE}</lastmod>
      </url>
      <url>
        <loc>${process.env.NEXT_PUBLIC_HOST}/static/btc_usdt</loc>
        <lastmod>${UPDATE_DATE}</lastmod>
      </url>
     ${data
       .map(
         (el) => `
       <url>
          <loc>${`${process.env.NEXT_PUBLIC_HOST}/trade/${el}`}</loc>
          <lastmod>${UPDATE_DATE}</lastmod>
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
