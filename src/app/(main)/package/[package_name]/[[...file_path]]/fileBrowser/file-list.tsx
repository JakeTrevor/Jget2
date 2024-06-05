import Link from "next/link";
import { Fragment } from "react";

import { type Directory } from "~/types";
import { FileIcon } from "~/components/icon";
import { directoryToList } from "~/lib/directoryToList";

export const FileList = ({
  package_name,
  pointer,
  data,
}: {
  data: Directory;
  pointer: string[];
  package_name: string;
}) => (
  <section className="mb-2 grid w-full grid-cols-3 gap-y-2 sm:grid-cols-7 md:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12">
    <p className="col-span-1 mb-1 bg-accent pb-1 pr-2 text-end font-title">
      Type
    </p>
    <p className="col-span-2 mb-1 bg-accent pb-1 pl-2 font-title sm:col-span-6 md:col-span-5 lg:col-span-8 xl:col-span-11">
      File Name
    </p>
    {directoryToList(data).map(([fileName, content]) => (
      <Fragment key={fileName}>
        <div className="col-span-1 flex items-center justify-end pr-2">
          <FileIcon folder={typeof content !== "string"} item={fileName} />
        </div>
        <Link
          className="link-hover link col-span-2 pl-2 sm:col-span-6 md:col-span-5 lg:col-span-8 xl:col-span-11"
          href={`/package/${package_name}/${pointer
            .concat(fileName)
            .join("/")}`}
        >
          {fileName}
        </Link>
      </Fragment>
    ))}
  </section>
);
