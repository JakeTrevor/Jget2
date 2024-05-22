import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationNextDisabled,
  PaginationPrevious,
  PaginationPreviousDisabled,
} from "~/components/ui/pagination";

import { newURL, type exploreQuery } from "~/lib/ExplorePageUrlMaker";
import { makePages } from "~/lib/makePages";

export const PageControls = ({
  num_pages: max,
  query,
}: {
  num_pages: number;
  query: exploreQuery;
}) => {
  max = max || 1;
  const page = query.page ?? 1;

  const { pageNumbers, pagesBefore, pagesAfter, isFirstPage, isLastPage } =
    makePages(page, max);

  const mkLink = (page: number) => newURL(query, { page });

  return (
    <Pagination className="w-min rounded-md bg-background p-2 shadow-lg">
      <PaginationContent>
        <PaginationItem>
          <PaginationFirst href={mkLink(1)} isActive={isFirstPage} />
        </PaginationItem>
        <PaginationItem>
          {isFirstPage ? (
            <PaginationPreviousDisabled />
          ) : (
            <PaginationPrevious href={mkLink(page - 1)} />
          )}
        </PaginationItem>
        {pagesBefore && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {pageNumbers.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink href={mkLink(p)} isActive={p === page}>
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}
        {pagesAfter && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          {isLastPage ? (
            <PaginationNextDisabled />
          ) : (
            <PaginationNext href={mkLink(page + 1)} />
          )}
        </PaginationItem>
        <PaginationItem>
          <PaginationLast href={mkLink(max)} isActive={isLastPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
