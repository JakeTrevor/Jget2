import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const Breadcrumbs = ({
  base,
  path,
}: {
  base: string;
  path: string[];
}) => (
  <ul className="flex flex-row text-sm">
    <li>
      <Link href={base}>/</Link>
    </li>
    {path.map((e, i, arr) => {
      if (i === arr.length - 1)
        return (
          <li key={e}>
            <ChevronRight className="inline" size={15} />
            {e}
          </li>
        );

      return (
        <li key={e}>
          <ChevronRight className="inline" size={15} />
          <Link href={base + arr.slice(0, i + 1).join("/")}>{e}</Link>
        </li>
      );
    })}
  </ul>
);
