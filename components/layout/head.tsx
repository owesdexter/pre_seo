import { ReactElement } from "react";
import NextHead from "next/head";
import { siteMetadata } from "@/constant/keywords";

type TPropType = {
  title?: string;
  description?: string;
  keywords?: string;
  ctRelStr?: string;
  reWriteCanonical?: string;
  reDirectUrl?: string;
  children?: ReactElement;
  useMetaRedirect?: boolean;
};

const Head = ({
  title,
  description,
  keywords,
  ctRelStr,
  reWriteCanonical,
  reDirectUrl,
  children,
  useMetaRedirect,
}: TPropType) => {
  return (
    <NextHead>
      <title>{title ?? siteMetadata.title}</title>
      <meta
        name="description"
        content={description ?? siteMetadata.description}
      />
      <meta name="keywords" content={keywords ?? siteMetadata.keywords} />

      {reWriteCanonical ? (
        <link rel="canonical" href={reWriteCanonical} />
      ) : ctRelStr ? (
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_HOST}/trade/${ctRelStr}`}
        />
      ) : (
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_HOST}`} />
      )}
      {useMetaRedirect &&
      reDirectUrl &&
      process.env.NEXT_PUBLIC_ENV !== "dev" ? (
        <meta httpEquiv="refresh" content={`0; url=${reDirectUrl}`}></meta>
      ) : null}
      {children}
    </NextHead>
  );
};

export default Head;
