import Link from "next/link";
import { FC, useEffect } from "react";

import File from "~/icons/file.svg";
import Folder from "~/icons/folder.svg";

interface props {
  data: Directory;
  package_name: string;
}

let FileList: FC<props> = ({ package_name, data }) => {
  let keys = Object.keys(data)
    .sort()
    .sort((a, b) => {
      let valA = typeof data[a] === "string" ? 0 : 1;
      let valB = typeof data[b] === "string" ? 0 : 1;
      return valB - valA;
    });
  //sorting twice - first to get alphabetical, second to get folders to top

  useEffect(() => {
    console.log(keys);
  });

  return (
    <section className="grid w-full grid-cols-3 gap-y-2 sm:grid-cols-7 md:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12">
      <p className="col-span-1 mb-1 bg-zinc-800 pb-1 pr-2 text-end font-title">
        Type
      </p>
      <p className="col-span-2 mb-1 bg-zinc-800 pb-1 pl-2 font-title sm:col-span-6 md:col-span-5 lg:col-span-8 xl:col-span-11">
        File Name
      </p>
      {keys.map((key) => (
        <>
          <div className="col-span-1 flex items-center justify-end pr-2">
            {typeof data[key] === "string" ? (
              <File className="text-white" width={15} />
            ) : (
              <Folder width={15} />
            )}
          </div>
          <Link
            className="link-hover link col-span-2 pl-2 sm:col-span-6 md:col-span-5 lg:col-span-8 xl:col-span-11"
            href={`/package/${package_name}/${key}`}
          >
            {key}
          </Link>
        </>
      ))}
    </section>
  );
};

export default FileList;
