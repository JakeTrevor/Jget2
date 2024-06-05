"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FC } from "react";

import { newURL, querySchema } from "~/lib/ExplorePageUrlMaker";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tooltip } from "./ui/tooltip";

const SearchBar: FC = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const query = querySchema.parse(searchParams);

  const [search, setSearch] = useState(query.search ?? "");

  async function go() {
    if (!search) return;
    router.push(newURL(query, { search }));
  }

  return (
    <span className="flex max-w-96 flex-row gap-0.5">
      <Input
        type="text"
        placeholder="search packages..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={async (e) => {
          if (e.key === "Enter") await go();
        }}
      />
      <Tooltip tip="search">
        <Button onClick={go} size="icon">
          <Search width="15" className="m-2 inline" />
        </Button>
      </Tooltip>
    </span>
  );
};

export default SearchBar;
