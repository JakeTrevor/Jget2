import { useRouter } from "next/router";
import { useState, type FC } from "react";

import Search from "~/icons/search.svg";

import { newURL, querySchema } from "~/utils/ExplorePageUrlMaker";

const SearchBar: FC = () => {
  const router = useRouter();
  const query = querySchema.parse(router.query);

  const [search, setSearch] = useState(query.search || "");

  async function go() {
    if (!search) return;
    await router.push(newURL(query)({ search }));
  }

  return (
    <span className="border-infoborder self-end rounded-lg border border-transparent bg-base-200 focus-within:border-info">
      <input
        type="text"
        className="rounded-lg bg-transparent p-1 px-2 outline-none"
        placeholder="search packages..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={async (e) => {
          if (e.key === "Enter") await go();
        }}
      />
      <button onClick={go}>
        <Search width="15" className="m-2 inline" />
      </button>
    </span>
  );
};

export default SearchBar;
