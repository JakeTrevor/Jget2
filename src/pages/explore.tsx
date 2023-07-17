import { type NextPage } from "next";
import { useRouter } from "next/router";
import { z } from "zod";

import Loading from "~/components/Loading";
import FilterControls from "~/components/explore/FilterControls";
import PageControls from "~/components/explore/PageControls";
import PackageListing from "~/components/package/PackageListing";
import { api } from "~/utils/api";

let querySchema = z.object({
  page: z.coerce.number().optional().default(1),
  search: z.coerce.string().optional(),
  sort: z.optional(z.string()).transform((str) => {
    if (str && ["downloads", "name", "updatedAt"].includes(str))
      return str as "downloads" | "name" | "updatedAt";
    return undefined;
  }),
  order: z
    .optional(z.string())
    .transform((str) => {
      if (str && ["asc", "desc"].includes(str)) return str as "asc" | "desc";
      return undefined;
    })
    .default("asc"),
});

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
        <PageControls
          page={query.page}
          num_pages={num_pages}
          base={{ pathname: "/explore/", query }}
        />
      </div>
    </main>
  );
};

export default Packages;
