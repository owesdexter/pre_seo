import { getLatestPrice } from "@/api";
import { GetServerSideProps } from "next";

function generateSiteMap(data: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${process.env.HOST}</loc>
        <lastmod>2021-01-07</lastmod>
      </url>
     ${data
       .map(
         (el) => `
       <url>
          <loc>${`${process.env.HOST}/trade/${el}`}</loc>
          <lastmod>2021-01-07</lastmod>
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
