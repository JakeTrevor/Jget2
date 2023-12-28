export function makePages(page: number, max: number) {
  let pageNumbers = [page - 2, page - 1, page, page + 1, page + 2];

  if (page === 1) {
    pageNumbers = [page, page + 1, page + 2, page + 3, page + 4];
  } else if (page === 2) {
    pageNumbers = [page - 1, page, page + 1, page + 2, page + 3];
  } else if (page === max) {
    pageNumbers = [page - 4, page - 3, page - 2, page - 1, page];
  } else if (page === max - 1) {
    pageNumbers = [page - 3, page - 2, page - 1, page, page + 1];
  }

  pageNumbers = pageNumbers.filter((e) => e <= max && e > 0);

  const pagesBefore = pageNumbers[0] !== 1;
  const pagesAfter = pageNumbers.at(-1) !== max;

  const isFirstPage = page === 1;
  const isLastPage = page === max;

  return {
    pageNumbers,
    pagesBefore,
    pagesAfter,
    isFirstPage,
    isLastPage,
  };
}
