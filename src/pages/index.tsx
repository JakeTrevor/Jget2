import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  let { data } = api.package.count.useQuery();

  let pkg_count = data || 0;

  return (
    <>
      <Head>
        <title>JGET</title>
        <meta name="description" content="JGET Package Manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col">
        <section className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="rounded-box flex flex-col bg-primary p-2 font-title text-neutral-content">
              <span className="countdown font-title text-5xl">
                {/* @ts-ignore */}
                <span style={{ "--value": pkg_count }}></span>
              </span>
              Packages
            </div>
            <div>
              <h1 className="text-4xl font-bold">
                A Package Manager for Computercraft
              </h1>
              <p>Jake Trevor</p>
            </div>
          </div>
        </section>

        <section className="my-10 w-3/4 self-center text-xl">
          <h3 className="divider mb-8 text-3xl font-bold">Why use JGET?</h3>
          <div className="grid grid-cols-1 gap-x-1 gap-y-3 lg:grid-cols-2">
            <div className="inline">
              <h4 className="inline font-title text-sky-500 lg:text-lime-500">
                Move Code{" "}
              </h4>
              seamlessly between computers
            </div>
            <span>
              <h4 className="inline font-title text-lime-500">Collaborate </h4>{" "}
              with others
            </span>
            <span>
              <h4 className="inline font-title text-yellow-800">Reuse </h4>
              packages and modules
            </span>
            <span>
              <h4 className="inline font-title text-slate-500 lg:text-yellow-800">
                Access{" "}
              </h4>
              useful modules written by others
            </span>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
