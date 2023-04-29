import { FC } from "react";
import FileDisplay from "./FileDisplay";

interface props {
  data: Directory;
  pointer: string[];
}

function getDir(data: Directory, pointer: string[]) {
  return pointer.reduce(
    (acc: Directory | string, val: string): Directory | string => {
      if (typeof acc === "string") return acc;
      let result = acc[val];
      if (!result) throw Error("lookup failed;");

      return result;
    },
    data
  );
}

let FileBrowser: FC<props> = ({ data, pointer }) => {
  let result = getDir(data, pointer);

  return (
    <section className="w-3/4">
      {
        typeof result === "string" ? <FileDisplay data={result} /> : <></>
        // <FileList/>
      }
    </section>
  );
};

export default FileBrowser;
