import { useRouter } from "next/router";
import { useState, type FC } from "react";

import Search from "~/icons/search.svg";

import { newURL, querySchema } from "~/utils/ExploreUrlMaker";

const SearchBar: FC = () => {
  let router = useRouter();
  let query = querySchema.parse(router.query);

  let [search, setSearch] = useState(query.search || "");

  function go() {
    if (!search) return;
    router.push(newURL(query)({ search }));
  }

  return (
    <span className="self-end rounded-lg bg-base-200">
      <input
        type="text"
        className="rounded-lg bg-transparent p-1"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") go();
        }}
      />
      <button onClick={go}>
        <Search width="15" className="m-2 inline" />
      </button>
    </span>
  );
};

export default SearchBar;
