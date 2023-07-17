import { useRouter } from "next/router";
import type { FC } from "react";

interface props {
  query: { sort?: "downloads" | "name" | "updatedAt"; order: "asc" | "desc" };
}

const FilterControls: FC<props> = ({ query }) => {
  let router = useRouter();

  let redirectTo = (newQuery: string) => () =>
    router.push({
      pathname: "/explore/",
      query: { ...query, sort: newQuery },
    });

  return (
    <div className="rounded-box flex h-full w-full flex-col bg-base-100 p-4">
      <h1 className="border-b-2 border-secondary p-1 text-2xl">
        Filter Packages
      </h1>
      <span className="flex flex-row justify-between">
        <h2>sort:</h2>
        <button
          onClick={() =>
            router.push({
              pathname: "/explore/",
              query: {
                ...query,
                order: query.order === "asc" ? "desc" : "asc",
              },
            })
          }
          className="text-sm"
        >
          {query.order}
        </button>
      </span>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Alphabetical</span>
          <input
            type="radio"
            name="radio-10"
            checked={query.sort === "name"}
            className="radio checked:bg-secondary"
            onClick={redirectTo("name")}
          />
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Downloads</span>
          <input
            type="radio"
            name="radio-10"
            checked={query.sort === "downloads"}
            className="radio checked:bg-secondary"
            onClick={redirectTo("downloads")}
          />
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Recent</span>
          <input
            type="radio"
            name="radio-10"
            checked={query.sort === "updatedAt"}
            className="radio checked:bg-secondary"
            onClick={redirectTo("updatedAt")}
          />
        </label>
      </div>
    </div>
  );
};

export default FilterControls;
