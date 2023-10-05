import Link from "next/link";
import type { FC } from "react";

import { exploreQuery, newURL } from "~/utils/ExplorePageUrlMaker";

interface props {
  num_pages: number;
  query: exploreQuery;
}

export const PageControls: FC<props> = ({ num_pages: max, query }) => {
  let page = query.page || 1;
  let page_numbers = [page - 2, page - 1, page, page + 1, page + 2];

  if (page === 1) {
    page_numbers = [page, page + 1, page + 2, page + 3, page + 4];
  } else if (page === 2) {
    page_numbers = [page - 1, page, page + 1, page + 2, page + 3];
  } else if (page === max) {
    page_numbers = [page - 4, page - 3, page - 2, page - 1, page];
  } else if (page === max - 1) {
    page_numbers = [page - 3, page - 2, page - 1, page, page + 1];
  }

  page_numbers = page_numbers.filter((e) => e <= max && e > 0);

  let redirectTo = newURL(query);

  return (
    <div className="btn-group m-2 font-title">
      <Link href={redirectTo({ page: 1 })} className="btn-outline btn w-16 p-4">
        First
      </Link>
      {page_numbers.map((e) => {
        return (
          <Link
            key={e}
            href={redirectTo({ page: e })}
            className={`btn-outline btn ${
              e === page ? "bg-lime-500/30 text-lime-700" : ""
            }`}
          >
            {e}
          </Link>
        );
      })}
      <Link
        href={redirectTo({ page: max })}
        className="btn-outline btn w-16 p-4"
      >
        Last
      </Link>
    </div>
  );
};

export const PageControlsLoading: FC = () => {
  return (
    <div className="btn-group m-2 animate-pulse rounded-md bg-slate-200 font-title">
      <div className="btn-outline btn w-16 p-4" />
      {Array.from(Array(5)).map((_) => {
        return <div className="btn-outline btn" />;
      })}
      <div className="btn-outline btn w-16 animate-pulse rounded-md bg-slate-200 p-4" />
    </div>
  );
};
