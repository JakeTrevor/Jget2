import { type NextPage } from "next";
import { useRouter } from "next/router";

import Loading from "~/components/Loading";
import FilterControls from "~/components/explore/FilterControls";
import PageControls from "~/components/explore/PageControls";
import PackageListing from "~/components/package/PackageListing";
import { querySchema } from "~/utils/ExploreUrlMaker";
import { api } from "~/utils/api";

const Packages: NextPage = () => {
  let router = useRouter();

  let query = querySchema.parse(router.query);

  let { data, status } = api.package.getList.useQuery(query);

  if (status === "loading")
    return (
      <main className="grid h-[93vh] w-full grid-cols-4 bg-base-200">
        <Loading />
      </main>
    );
  else if (status === "error")
    return (
      <main className="grid h-[93vh] w-full grid-cols-4 bg-base-200">
        <p>something went wrong...</p>
      </main>
    );

  let { packages, num_pages } = data!;

  return (
    <main className="grid h-[93vh] w-full grid-cols-4 bg-base-200">
      <div className="flex flex-col items-center justify-center py-20 pl-10 pr-20">
        <FilterControls query={query} />
      </div>
      <div className="col-span-2 flex flex-col items-center justify-around">
        <ul className="menu rounded-box h-[52vh] w-full bg-base-100 p-2">
          {packages.map((pkg, i) => (
            <PackageListing data={pkg} key={i} />
          ))}
        </ul>
        <PageControls num_pages={num_pages} query={query} />
      </div>
    </main>
  );
};

export default Packages;
