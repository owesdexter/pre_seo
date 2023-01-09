import { ReactElement } from "react";
import NextHead from "next/head";

type TPropType = {
  title?: string;
  ctRelStr?: string;
  description?: string;
  children?: ReactElement;
};

const Head = ({ title, description, ctRelStr, children }: TPropType) => {
  const websiteTitle = process.env.NEXT_PUBLIC_TITLE;
  return (
    <NextHead>
      <title>{title ?? websiteTitle}</title>
      <meta name="description" content={description ?? websiteTitle} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="google-site-verification"
        content={`${process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}`}
      />
      <link
        rel="canonical"
        href={`${process.env.NEXT_PUBLIC_HOST}${`${
          ctRelStr ? `/trade/${ctRelStr}` : ""
        }`}`}
      />
      {children}
    </NextHead>
  );
};

export default Head;
