import { ReactElement } from "react";
import NextHead from "next/head";

type TPropType = {
  title?: string;
  description?: string;
  keywords?: string;
  ctRelStr?: string;
  isDynamic?: boolean;
  reWriteCanonical?: string;
  children?: ReactElement;
};

const Head = ({
  title,
  description,
  keywords,
  ctRelStr,
  isDynamic,
  reWriteCanonical,
  children,
}: TPropType) => {
  const websiteTitle = process.env.NEXT_PUBLIC_TITLE;
  const newCtRelStr =
    ctRelStr && !isDynamic
      ? ctRelStr.toLowerCase().replace("/", "_")
      : "btc_twd";
  return (
    <NextHead>
      <title>{title ?? websiteTitle}</title>
      <meta name="description" content={description ?? websiteTitle} />
      <meta name="keywords" content={keywords ?? websiteTitle} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="google-site-verification"
        content={`${process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}`}
      />
      {reWriteCanonical ? (
        <link rel="canonical" href={reWriteCanonical} />
      ) : (
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_HOST}${`${
            ctRelStr
              ? isDynamic
                ? `/trade/${ctRelStr}`
                : `/static/${newCtRelStr}`
              : ""
          }`}`}
        />
      )}
      {children}
    </NextHead>
  );
};

export default Head;
