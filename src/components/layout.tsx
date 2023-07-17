import type { FC, ReactNode } from "react";
import Header from "./header";
import Head from "next/head";

let Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Head>
        <title>JGET</title>
        <meta name="description" content="JGET Package Manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {children}
    </>
  );
};

export default Layout;
