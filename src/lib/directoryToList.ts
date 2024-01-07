import { type Directory } from "~/types";

export const directoryToList = (data: Directory) =>
  Object.entries(data)
    //sorting twice - first to get alphabetical, second to get folders to top
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .sort(([_a, a], [_b, b]) => {
      const valA = typeof a === "string" ? 0 : 1;
      const valB = typeof b === "string" ? 0 : 1;
      return valB - valA;
    });
