import { useRouter } from "next/router";
import type { FC } from "react";
import {
  exploreDefaults,
  exploreQuery,
  newURL,
} from "~/utils/ExplorePageUrlMaker";
import Ascending from "~/icons/ascending.svg";
import Descending from "~/icons/descending.svg";

interface props {
  query: exploreQuery;
}

const FilterControls: FC<props> = ({ query: Q }) => {
  let query = { ...exploreDefaults, ...Q };
  let router = useRouter();

  let redirectTo = (newQ: exploreQuery) => () => router.push(newURL(Q)(newQ));

  return (
    <div className="rounded-box flex h-full w-full flex-col bg-base-100 p-4">
      <h1 className="border-b-2 border-secondary p-1 text-2xl">
        Filter Packages
      </h1>
      <span className="flex flex-row justify-end">
        <button
          onClick={redirectTo({
            order: query.order === "asc" ? "desc" : "asc",
          })}
          className="text-sm"
        >
          {query.order === "asc" ? (
            <Descending width="15" className="m-2 inline" />
          ) : (
            <Ascending width="15" className="m-2 inline" />
          )}
        </button>
      </span>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Alphabetical</span>
          <input
            type="radio"
            name="radio-10"
            checked={query.sorting === "name"}
            className="radio checked:bg-secondary"
            onClick={redirectTo({ sorting: "name" })}
          />
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Downloads</span>
          <input
            type="radio"
            name="radio-10"
            checked={query.sorting === "downloads"}
            className="radio checked:bg-secondary"
            onClick={redirectTo({ sorting: "downloads" })}
          />
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Recent</span>
          <input
            type="radio"
            name="radio-10"
            checked={query.sorting === "updatedAt"}
            className="radio checked:bg-secondary"
            onClick={redirectTo({ sorting: "updatedAt" })}
          />
        </label>
      </div>
    </div>
  );
};

export default FilterControls;
