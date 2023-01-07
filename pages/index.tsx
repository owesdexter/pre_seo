import CommonHead from "@/components/layout/head";

export default function Home() {
  return (
    <>
      <CommonHead />
      <main className="title">
        <h1>{`${process.env.NEXT_PUBLIC_TITLE} 首頁`}</h1>
      </main>
    </>
  );
}
