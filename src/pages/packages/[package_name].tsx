import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

const Packages: NextPage = () => {
  const router = useRouter();
  const { package_name } = router.query;

  return (
    <>
      <Head>
        <title>JGET</title>
        <meta name="description" content="JGET Package Manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section className="mt-10 flex w-full flex-row justify-around">
          <p className="font-sans">View a specific package.</p>
          <h2>{package_name}</h2>
        </section>
      </main>
    </>
  );
};

export default Packages;
