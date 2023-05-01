import { FC } from "react";
import FileDisplay from "./FileDisplay";
import FileList from "./FileList";
import Link from "next/link";

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

  let crumbs = [package_name, ...pointer];

  return (
    <section className="w-3/4">
      <div className="breadcrumbs text-sm">
        <ul>
          {crumbs.map((e, i, arr) => {
            if (i === arr.length - 1) return <li>{e}</li>;
            let path = arr.slice(0, i + 1).join("/");

            return (
              <li>
                <Link href={`/package/${path}`}>{e}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      {typeof result === "string" ? (
        <FileDisplay data={result} />
      ) : (
        <FileList package_name={package_name} data={result} />
      )}
    </section>
  );
};

export default FileBrowser;
