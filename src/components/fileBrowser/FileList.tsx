import Link from "next/link";
import { Fragment, type FC } from "react";
import Icon from "./Icon";

interface props {
  data: Directory;
  pointer: string[];
  package_name: string;
}

const FileList: FC<props> = ({ package_name, pointer, data }) => {
  const keys = Object.keys(data)
    .sort()
    .sort((a, b) => {
      const valA = typeof data[a] === "string" ? 0 : 1;
      const valB = typeof data[b] === "string" ? 0 : 1;
      return valB - valA;
    });
  //sorting twice - first to get alphabetical, second to get folders to top

  return (
    <section className="mb-2 grid w-full grid-cols-3 gap-y-2 sm:grid-cols-7 md:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12">
      <p className="col-span-1 mb-1 bg-zinc-800 pb-1 pr-2 text-end font-title">
        Type
      </p>
      <p className="col-span-2 mb-1 bg-zinc-800 pb-1 pl-2 font-title sm:col-span-6 md:col-span-5 lg:col-span-8 xl:col-span-11">
        File Name
      </p>
      {keys.map((key) => (
        <Fragment key={key}>
          <div
            className="col-span-1 flex items-center justify-end pr-2"
            key={`${key}-icon`}
          >
            <Icon data={data} item={key} />
          </div>
          <Link
            key={`${key}-link`}
            className="link-hover link col-span-2 pl-2 sm:col-span-6 md:col-span-5 lg:col-span-8 xl:col-span-11"
            href={`/package/${package_name}/${pointer.concat(key).join("/")}`}
            // This is malformed ^
          >
            {key}
          </Link>
        </Fragment>
      ))}
    </section>
  );
};

export default FileList;
