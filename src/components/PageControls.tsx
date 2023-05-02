import Link from "next/link";
import type { FC } from "react";

interface props {
  page: number;
  num_pages: number;
  base: string;
}

let PageControls: FC<props> = ({ page, num_pages: max, base }) => {
  let page_numbers = [page - 2, page - 1, page, page + 1, page + 2];

  page_numbers = page_numbers.filter((e) => e <= max && e > 0);

  return (
    <div className="btn-group m-2">
      <Link href={`${base}${1}`} className="btn-outline btn">
        First
      </Link>
      {page_numbers.map((e) => {
        return (
          <Link href={`${base}${e}`} className="btn">
            {e}
          </Link>
        );
      })}
      <Link href={`${base}${max}`} className="btn-outline btn">
        Last
      </Link>
    </div>
  );
};

export default PageControls;
