import { Package } from "@prisma/client";
import Link from "next/link";
import type { FC } from "react";

interface props {
  data: Package;
}

let PackageListing: FC<props> = ({
  data: { name, downloads, createdAt, updatedAt },
}) => {
  return (
    <li className="h-[10vh]">
      <Link href={`/package/${name}/`} className="grid grid-cols-3">
        <h2 className="col-span-3 text-xl font-bold">{name}</h2>
        <p>created: {createdAt.toLocaleDateString()}</p>
        <p>updated: {updatedAt.toLocaleDateString()}</p>
        <p className="text-right">{downloads} downloads</p>
      </Link>
    </li>
  );
};

export default PackageListing;
