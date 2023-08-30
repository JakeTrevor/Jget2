import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  let { data } = api.package.count.useQuery();

  let pkg_count = data || 0;

  return (
    <>
      <Head>
        <title>JGET | edit</title>
        <meta name="description" content="JGET Package Editor" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-[100vh] flex-row bg-code text-white">
        <section className="h-full w-[10%] border-r border-white">
          files
        </section>
        <section>editor</section>
      </main>
    </>
  );
};

export default Home;
