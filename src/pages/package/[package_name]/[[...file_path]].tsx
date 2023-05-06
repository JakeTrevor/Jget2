import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import Downloads from "~/icons/downloads.svg";

import CopyButton from "~/components/CopyButton";
import FileBrowser from "~/components/fileBrowser";
import { api } from "~/utils/api";

const Packages: NextPage = () => {
  const router = useRouter();
  let { package_name, file_path } = router.query;

  if (typeof package_name !== "string") return <>invalid package name</>; //theoretical error

  file_path ||= [];
  if (typeof file_path === "string") file_path = [file_path];

  const { data } = api.package.getByName.useQuery(package_name);

  const download_count = data?.downloads || 0;
  const created_at = data?.createdAt || new Date();
  const updated_at = data?.updatedAt || new Date();

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
            <div className="stats">
              <div className="stat">
                <div className="stat-figure text-primary">
                  <Downloads width={30} />
                </div>
                <div className="stat-title">Downloads</div>
                <div className="stat-value text-primary">{download_count}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Created On</div>
                <div className="stat-value text-primary">
                  {created_at.toLocaleDateString()}
                </div>
              </div>
              <div className="stat">
                <div className="stat-title">Last Updated</div>
                <div className="stat-value text-primary">
                  {updated_at.toLocaleDateString()}
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold italic text-accent">
                Install this package:
              </h4>
              <pre className="rounded-md bg-secondary p-3 text-emerald-500">
                $ <span className="text-white">jget get {package_name} </span>
                <CopyButton text={`jget get ${package_name}`} />
              </pre>
            </div>
          </div>
        </section>
        {data?.files && (
          <FileBrowser
            package_name={package_name}
            data={data.files}
            pointer={file_path}
          />
        )}
      </main>
    </>
  );
};

export default Packages;
