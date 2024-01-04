import { ArrowDownNarrowWide, ArrowUpWideNarrow } from "lucide-react";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Tooltip } from "~/components/ui/tooltip";
import {
  exploreDefaults,
  newURL,
  type exploreQuery,
} from "~/lib/ExplorePageUrlMaker";

export const FilterControls = ({ query: Q }: { query: exploreQuery }) => {
  const query = { ...exploreDefaults, ...Q };

  return (
    <div className="flex h-full w-full flex-col rounded-md bg-background p-4 shadow-lg">
      <h1 className="border-b-2 border-sky p-1 text-2xl">Filter Packages</h1>
      <span className="flex flex-row justify-end">
        <Tooltip tip="sorting asc/desc">
          <Button variant="ghost" size="sm" asChild>
            <Link
              href={newURL(Q, {
                order: query.order === "asc" ? "desc" : "asc",
              })}
            >
              {query.order === "asc" ? (
                <ArrowDownNarrowWide width={15} />
              ) : (
                <ArrowUpWideNarrow width={15} />
              )}
            </Link>
          </Button>
        </Tooltip>
      </span>
      <RadioGroup value={query.sorting} defaultValue="comfortable">
        <Link
          href={newURL(Q, { sorting: "name" })}
          className="flex items-center justify-between space-x-2 px-3"
        >
          <Label htmlFor="r1">Alphabetical</Label>
          <RadioGroupItem value="name" id="r1" />
        </Link>
        <Link
          href={newURL(Q, { sorting: "downloads" })}
          className="flex items-center justify-between space-x-2 px-3"
        >
          <Label htmlFor="r2">Downloads</Label>
          <RadioGroupItem value="downloads" id="r2" />
        </Link>
        <Link
          href={newURL(Q, { sorting: "updatedAt" })}
          className="flex items-center justify-between space-x-2 px-3"
        >
          <Label htmlFor="r3">Recent</Label>
          <RadioGroupItem value="updatedAt" id="r3" />
        </Link>
      </RadioGroup>
    </div>
  );
};
