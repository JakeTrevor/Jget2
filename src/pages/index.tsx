import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  let { data, isLoading, error } = api.package.count.useQuery();
  return (
    <>
      <Head>
        <title>JGET</title>
        <meta name="description" content="JGET Package Manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section className="mt-10 flex w-full flex-row justify-around">
          <p className="font-sans">Package Manager for Computercraft</p>
          <h3>{isLoading ? <></> : <>{data} Packages</>}</h3>
        </section>
      </main>
    </>
  );
};

export default Home;
