import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Loading from "~/components/Loading";
import PageControls from "~/components/PageControls";
import { api } from "~/utils/api";

const Packages: NextPage = () => {
  let { page: rawPage } = useRouter().query;

  rawPage ||= "1";

  let page: number = 1;
  if (typeof rawPage === "string") {
    page = parseInt(rawPage) || 1;
  } else {
    page = parseInt(rawPage[0] || "1") || 1;
  }

  let { data, isLoading } = api.package.getList.useQuery({ page });

  let packages = data?.packages || [];
  let num_pages = data?.num_pages || 0;

  return (
    <>
      <Head>
        <title>JGET</title>
        <meta name="description" content="JGET Package Manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen w-full flex-col items-center justify-around bg-base-200">
        <h1 className="font-title">Explore Packages</h1>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <ul className="menu rounded-box w-1/2 bg-base-100 p-2">
              {packages.map((e) => (
                <li>
                  <Link
                    className="flex flex-row justify-between"
                    href={`/package/${e.name}`}
                  >
                    <h3>{e.name}</h3>
                    <p>{e.downloads} downloads</p>
                  </Link>
                </li>
              ))}
            </ul>
            <PageControls
              page={page}
              num_pages={num_pages}
              base={"/explore/"}
            />
          </>
        )}
      </main>
    </>
  );
};

export default Packages;
