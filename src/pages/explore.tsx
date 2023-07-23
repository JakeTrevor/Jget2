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
    <main className="grid w-full grid-cols-4 gap-4 bg-base-200 p-10">
      <div className="row-span-2 pl-4 pr-12">
        <FilterControls query={query} />
      </div>

      <ul className="rounded-box col-span-2 row-span-2 flex h-[60vh] w-full flex-col flex-nowrap justify-start bg-base-100 p-2">
        {packages.map((pkg, i) => (
          <PackageListing data={pkg} key={i} />
        ))}
      </ul>
      <div className="col-span-2 col-start-2 flex items-center justify-center">
        <PageControls num_pages={num_pages} query={query} />
      </div>
    </main>
  );
};

export default Packages;
