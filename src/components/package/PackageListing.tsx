import { type Package } from "@prisma/client";
import Link from "next/link";
import type { FC } from "react";

interface props {
  data: Package;
}

const PackageListing: FC<props> = ({
  data: { name, downloads, createdAt, updatedAt },
}) => {
  return (
    <Link
      href={`/package/${name}/`}
      className="grid h-[12vh] grid-cols-3 rounded-sm px-2 py-1 transition-all duration-300 hover:scale-105 hover:bg-base-300"
    >
      <h2 className="col-span-3 text-lg font-bold">{name}</h2>
      <p>created: {createdAt.toLocaleDateString()}</p>
      <p>updated: {updatedAt.toLocaleDateString()}</p>
      <p className="text-right">{downloads} downloads</p>
    </Link>
  );
};

export const PackageListingLoading = () => (
  <div className="grid h-[12vh] animate-pulse grid-cols-3 px-2 py-1">
    <h2 className="col-span-3 animate-pulse rounded-md bg-slate-200 text-lg font-bold" />
    <p className="m-5 ml-0 animate-pulse rounded-md bg-slate-200" />
    <p className="m-5 animate-pulse rounded-md bg-slate-200" />
    <p className="m-5 mr-0 animate-pulse rounded-md bg-slate-200" />
  </div>
);

export default PackageListing;
