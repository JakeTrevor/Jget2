import { type NextPage } from "next";
import { useRouter } from "next/router";

import FilterControls from "~/components/explore/FilterControls";
import {
  PageControls,
  PageControlsLoading,
} from "~/components/explore/PageControls";
import PackageListing, {
  PackageListingLoading,
} from "~/components/package/PackageListing";
import { querySchema } from "~/utils/ExplorePageUrlMaker";
import { api } from "~/utils/api";

const Packages: NextPage = () => {
  const router = useRouter();

  const query = querySchema.parse(router.query);

  const { data, status } = api.package.getList.useQuery(query);

  if (status === "error")
    return (
      <main className="grid h-[93vh] w-full grid-cols-4 bg-base-200">
        <p>something went wrong...</p>
      </main>
    );

  const { packages, num_pages } = data || { packages: [], num_pages: 0 };

  return (
    <main className="grid w-full grid-cols-4 gap-4 bg-base-200 p-10">
      <div className="row-span-2 pl-4 pr-12">
        <FilterControls query={query} />
      </div>

      <ul className="rounded-box col-span-2 row-span-2 flex h-[60vh] w-full flex-col flex-nowrap justify-start bg-base-100 p-2">
        {packages.length
          ? packages.map((pkg, i) => <PackageListing data={pkg} key={i} />)
          : [...Array(5).keys()].map((_, i) => (
              <PackageListingLoading key={i} />
            ))}
      </ul>
      <div className="col-span-2 col-start-2 flex items-center justify-center">
        {status === "success" ? (
          <PageControls num_pages={num_pages} query={query} />
        ) : (
          <PageControlsLoading />
        )}
      </div>
    </main>
  );
};

export default Packages;
