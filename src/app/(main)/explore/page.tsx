import { querySchema } from "~/lib/ExplorePageUrlMaker";
import { api } from "~/trpc/server";

import { FilterControls } from "./FilterControls";
import { PackageListing } from "./PackageListing";
import { PageControls } from "./PageControls";

export default async function Home({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const query = querySchema.parse(searchParams);

  const { packages, num_pages } = await api.package.getList.query(query);

  return (
    <main className="bg-body grid min-h-[93vh] w-full grid-cols-4 gap-4 p-10">
      <div className="row-span-2 pl-4 pr-12">
        <FilterControls query={query} />
      </div>

      <ul className="col-span-2 row-span-2 flex h-[60vh] w-full flex-col flex-nowrap justify-start rounded-md bg-background p-2 shadow-lg">
        {packages.map((pkg, i) => (
          <PackageListing data={pkg} key={i} />
        ))}
      </ul>
      <div className="col-span-2 col-start-2 flex items-center justify-center">
        <PageControls num_pages={num_pages} query={query} />
      </div>
    </main>
  );
}
