import { type NextPage } from "next";
import Head from "next/head";

const Packages: NextPage = () => {
  return (
    <>
      <Head>
        <title>JGET</title>
        <meta name="description" content="JGET Package Manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section className="mt-10 flex w-full flex-row justify-around">
          <p className="font-sans">Explore Packages</p>
        </section>
      </main>
    </>
  );
};

export default Packages;
