import Link from "next/link";
import type { FC } from "react";

import { exploreQuery, newURL } from "~/utils/ExplorePageUrlMaker";

interface props {
  num_pages: number;
  query: exploreQuery;
}

let PageControls: FC<props> = ({ num_pages: max, query }) => {
  let page = query.page || 1;
  let page_numbers = [page - 2, page - 1, page, page + 1, page + 2];

  page_numbers = page_numbers.filter((e) => e <= max && e > 0);

  let redirectTo = newURL(query);

  return (
    <div className="btn-group m-2 font-title">
      <Link href={redirectTo({ page: 1 })} className="btn-outline btn">
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
      <Link href={redirectTo({ page: max })} className="btn-outline btn">
        Last
      </Link>
    </div>
  );
};

export default PageControls;
