import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

import CopyButton from "~/components/CopyButton";
import FileBrowser from "~/components/fileBrowser";
import { api } from "~/utils/api";

const Packages: NextPage = () => {
  const router = useRouter();
  const { package_name } = router.query;

  if (typeof package_name !== "string") return <>invalid package name</>;

  const { data } = api.package.getFiles.useQuery(package_name);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <Head>
        <title>JGET | {package_name}</title>
        <meta name="description" content="JGET Package Manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-base-200">
        <section className="my-10 w-3/4">
          <h2 className="text-3xl font-bold">{package_name}</h2>
          <div className="divider" />
          <div className="flex flex-row justify-between">
            <div></div>
            <div>
              <h4 className="font-semibold italic text-accent">
                Install this package:
              </h4>
              <pre className="rounded-md bg-secondary p-3 text-emerald-500">
                $ <code className="text-white">jget get {package_name} </code>
                <CopyButton text={`jget get ${package_name}`} />
              </pre>
            </div>
          </div>
        </section>
        {data && <FileBrowser data={data} pointer={["Split.lua"]} />}
      </main>
    </>
  );
};

export default Packages;
