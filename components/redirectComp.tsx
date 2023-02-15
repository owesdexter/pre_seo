import { useEffect } from "react";

type TPropType = {
  url: string;
  label?: string;
};

const RedirectComp = ({ url, label }: TPropType) => {
  useEffect(() => {
    if (!document) {
      return;
    }
    if (process.env.NEXT_PUBLIC_ENV !== "dev") {
      document.getElementById("redirect-link")?.click();
    }
  }, []);

  return (
    <a target="_self" href={url} id="redirect-link">
      {label ?? "Link"}
    </a>
  );
};

export default RedirectComp;
