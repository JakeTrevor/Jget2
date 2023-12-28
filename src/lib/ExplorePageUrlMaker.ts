import { z } from "zod";

export const querySchema = z.object({
  page: z.coerce.number().optional(),
  search: z.coerce.string().optional(),
  sorting: z.optional(z.string()).transform((str) => {
    if (str && ["downloads", "name", "updatedAt"].includes(str))
      return str as "downloads" | "name" | "updatedAt";
    return undefined;
  }),
  order: z.optional(z.string()).transform((str) => {
    if (str && ["asc", "desc"].includes(str)) return str as "asc" | "desc";
    return undefined;
  }),
});

export type exploreQuery = z.infer<typeof querySchema>;

export const exploreDefaults = {
  page: 1,
  sorting: "downloads",
  order: "desc",
};

export const newURL = (oldQuery: exploreQuery, newQuery: exploreQuery) => {
  const query = {
    ...oldQuery,
    ...newQuery,
  };

  if (query.sorting === "downloads") delete query.sorting;
  if (query.order === "desc") delete query.order;
  if (query.page === 1) delete query.page;

  const url = new URL("https://example.com/explore");
  for (const [k, v] of Object.entries(query)) {
    url.searchParams.append(k, v.toString());
  }

  return url.pathname + url.search;
};
