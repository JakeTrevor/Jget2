import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";

export const Breadcrumbs = ({
  base,
  path,
  baseIcon = "/",
}: {
  base: string;
  path: string[];
  baseIcon?: ReactNode;
}) => {
  const Comp = path.length ? Link : Fragment;

  return (
    <ul className="flex flex-row text-sm">
      <li>
        <Comp href={base}>{baseIcon}</Comp>
      </li>
      {path.map((e, i, arr) => {
        const Comp = i === arr.length - 1 ? Link : Fragment;

        return (
          <li key={e}>
            <ChevronRight className="inline" size={15} />
            <Comp href={e}>{i === 0 ? baseIcon : e}</Comp>
          </li>
        );
      })}
    </ul>
  );
};
