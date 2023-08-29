import { FC, useState } from "react";
import FileDisplay from "./FileDisplay";
import FileList from "./FileList";
import Link from "next/link";

import Back from "~/icons/back.svg";
import { api } from "~/utils/api";
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

  let backDest =
    pointer.length > 0
      ? `/package/${package_name}/${pointer.slice(0, -1).join("/")}`
      : `/package/${package_name}`;

  return (
    <section className="mb-20 min-h-[50vh] w-3/4 overflow-hidden rounded-md bg-code text-white shadow-xl">
      <div className="flex flex-row items-baseline justify-between border-b border-white p-5">
        <div className="breadcrumbs text-sm">
          <ul className="font-mono underline-offset-4">
            <li>
              {pointer.length > 0 ? (
                <Link href={`/package/${package_name}`}>/</Link>
              ) : (
                <>/</>
              )}
            </li>
            {pointer.map((e, i, arr) => {
              if (i === arr.length - 1) return <li>{e}</li>;
              let path = arr.slice(0, i + 1).join("/");

              return (
                <li>
                  <Link href={`/package/${package_name}/${path}`}>{e}</Link>
                </li>
              );
            })}
          </ul>
        </div>

        <Link
          className={`transition-all ${
            pointer.length > 0
              ? "tooltip hover:scale-110"
              : "cursor-default text-zinc-500"
          }`}
          data-tip="Back"
          href={backDest}
        >
          <Back width={15} />
        </Link>
      </div>
      {typeof result === "string" ? (
        <FileDisplay
          data={result}
          pointer={pointer}
          file_name={pointer.at(-1) || ""}
        />
      ) : (
        <FileList package_name={package_name} pointer={pointer} data={result} />
      )}
    </section>
  );
};

export default FileBrowser;
