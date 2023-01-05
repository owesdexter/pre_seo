//pages/sitemap.xml.js
import { getLatestPrice } from "@/api";
import { GetServerSideProps } from "next";
const THIS_SITE_URL = "https://pre-seo.vercel.app";

function generateSiteMap(data: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${data
       .map(
         (el) => `
       <url>
           <loc>${`${THIS_SITE_URL}/trade/${el}`}</loc>
       </url>
     `
       )
       .join("")}
   </urlset>
 `;
}

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
