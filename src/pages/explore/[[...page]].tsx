import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Loading from "~/components/Loading";
import { api } from "~/utils/api";

const Packages: NextPage = () => {
  let { page: rawPage } = useRouter().query;

  rawPage ||= "1";

  let page: number;
  if (typeof rawPage === "string") {
    page = parseInt(rawPage);
  } else {
    page = parseInt(rawPage[0] || "1");
  }

  let { data, isLoading } = api.package.getList.useQuery({ page });

  data ||= [];

  return (
    <>
      <Head>
        <title>JGET</title>
        <meta name="description" content="JGET Package Manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mt-10 flex w-full flex-col items-center justify-around">
        <p className="font-sans">Explore Packages</p>
        {isLoading ? (
          <Loading />
        ) : (
          <ul className="menu rounded-box w-1/2 bg-base-100 p-2">
            {data.map((e) => (
              <li>
                <Link href={`/package/${e.name}`}>{e.name}</Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
};

export default Packages;
