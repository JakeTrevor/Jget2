import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Loading from "~/components/Loading";
import FilterControls from "~/components/explore/FilterControls";
import PageControls from "~/components/explore/PageControls";
import PackageListing from "~/components/package/PackageListing";
import { api } from "~/utils/api";

const Packages: NextPage = () => {
  let rawPage = useRouter().query.page || "1";

  let page: number = 1;

  if (typeof rawPage === "string") page = parseInt(rawPage) || 1;
  else page = parseInt(rawPage[0] || "1") || 1;

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
      <main className="grid h-[93vh] w-full grid-cols-4 bg-base-200">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="flex flex-col items-center justify-center py-20 pl-10 pr-20">
              <FilterControls />
            </div>
            <div className="col-span-2 flex flex-col items-center justify-around">
              <ul className="menu rounded-box h-[52vh] w-full bg-base-100 p-2">
                {packages.map((pkg) => (
                  <PackageListing data={pkg} />
                ))}
              </ul>
              <PageControls
                page={page}
                num_pages={num_pages}
                base={"/explore/"}
              />
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Packages;
