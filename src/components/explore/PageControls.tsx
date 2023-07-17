import Link from "next/link";
import type { FC } from "react";
import { UrlObject } from "url";

interface props {
  page: number;
  num_pages: number;
  base: { pathname: string; query: Record<string, any> };
}

let PageControls: FC<props> = ({ page, num_pages: max, base }) => {
  let page_numbers = [page - 2, page - 1, page, page + 1, page + 2];

  page_numbers = page_numbers.filter((e) => e <= max && e > 0);

  return (
    <div className="btn-group m-2 font-title">
      <Link
        href={{ ...base, query: { ...base.query, page: 1 } }}
        className="btn btn-outline"
      >
        First
      </Link>
      {page_numbers.map((e) => {
        return (
          <Link
            key={e}
            href={{ ...base, query: { ...base.query, page: e } }}
            className={`btn btn-outline ${
              e === page ? "bg-lime-500/30 text-lime-700" : ""
            }`}
          >
            {e}
          </Link>
        );
      })}
      <Link
        href={{ ...base, query: { ...base.query, page: max } }}
        className="btn btn-outline"
      >
        Last
      </Link>
    </div>
  );
};

export default PageControls;
