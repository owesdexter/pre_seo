import { ReactElement } from "react";

type TPropType = {
  title?: string;
  description?: string;
  children?: ReactElement;
};

const Head = ({ title, description, children }: TPropType) => {
  const websiteTitle = process.env.NEXT_PUBLIC_TITLE;
  return (
    <>
      <title>{title ?? websiteTitle}</title>
      <meta name="description" content={description ?? websiteTitle} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="google-site-verification"
        content={process.env.GOOGLE_SITE_VERIFICATION}
      />
      <link rel="canonical" href={`${process.env.HOST}`} />
      {children}
    </>
  );
};

export default Head;
