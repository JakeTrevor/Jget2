import { FC, useState } from "react";
import FileDisplay from "./FileDisplay";
import FileList from "./FileList";
import Link from "next/link";

import Back from "~/icons/back.svg";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
interface props {
  data: Directory;
  pointer: string[];
  package_name: string;
  update: (data: string, pointer: string[]) => void;
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

let FileBrowser: FC<props> = ({ package_name, data, pointer, update }) => {
  const [editable, setEditable] = useState(false);

  let { mutateAsync } = api.package.updatePackage.useMutation();

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

        {typeof result === "string" &&
          (editable ? (
            <button
              onClick={() =>
                toast
                  .promise(mutateAsync({ name: package_name, data }), {
                    loading: "Saving...",
                    success: "Saved!",
                    error: "something went wrong",
                  })
                  .then(() => setEditable(false))
              }
              className="btn ml-auto mr-10 bg-accent"
            >
              save
            </button>
          ) : (
            <button
              onClick={() => setEditable(true)}
              className="btn ml-auto mr-10 bg-accent"
            >
              edit
            </button>
          ))}

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
          update={update}
          editable={editable}
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
