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

export const newURL = (oldQuery: exploreQuery) => (newQuery: exploreQuery) => {
  const url = {
    pathname: "/explore/",
    query: {
      ...oldQuery,
      ...newQuery,
    },
  };

  if (url.query.sorting === "downloads") delete url.query.sorting;
  if (url.query.order === "desc") delete url.query.order;
  if (url.query.page === 1) delete url.query.page;

  return url;
};
