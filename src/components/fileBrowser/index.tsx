import { FC } from "react";
import FileDisplay from "./FileDisplay";
import FileList from "./FileList";

interface props {
  data: Directory;
  pointer: string[];
  package_name: string;
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

let FileBrowser: FC<props> = ({ package_name, data, pointer }) => {
  let result = getDir(data, pointer);

  return (
    <section className="w-3/4">
      {typeof result === "string" ? (
        <FileDisplay data={result} />
      ) : (
        <FileList package_name={package_name} data={result} />
      )}
    </section>
  );
};

export default FileBrowser;
