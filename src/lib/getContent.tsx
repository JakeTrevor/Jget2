import { type Directory } from "~/types";

export function getContent(data: Directory, pointer: string[]) {
  return pointer.reduce(
    (acc: Directory | string, val: string): Directory | string => {
      if (typeof acc === "string") return acc;
      const result = acc[val];
      if (!result) throw Error("lookup failed;");

      return result;
    },
    data,
  );
}
