import { FolderUp } from "lucide-react";
import Link from "next/link";

import { FileDisplay } from "./FileDisplay";
import { FileList } from "./FileList";
import { Breadcrumbs } from "~/components/breadcrumbs";
import { Button } from "~/components/ui/button";
import { Tooltip } from "~/components/ui/tooltip";

function getDir(data: Directory, pointer: string[]) {
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

export const FileBrowser = ({
  package_name,
  data,
  pointer,
}: {
  data: Directory;
  pointer: string[];
  package_name: string;
}) => {
  const result = getDir(data, pointer);

  const backDest =
    pointer.length > 0
      ? `/package/${package_name}/${pointer.slice(0, -1).join("/")}`
      : `/package/${package_name}`;

  return (
    <section className="mb-20 min-h-[50vh] w-3/4 overflow-hidden rounded-md bg-background text-foreground shadow-xl">
      <div className="flex flex-row items-baseline justify-between border-b border-white p-5">
        <Breadcrumbs base={`/package/${package_name}/`} path={pointer} />
        <Tooltip tip="back">
          <Button variant="ghost" asChild>
            <Link href={backDest}>
              <FolderUp size={15} />
            </Link>
          </Button>
        </Tooltip>
      </div>
      {typeof result === "string" ? (
        <FileDisplay data={result} file_name={pointer.at(-1) ?? ""} />
      ) : (
        <FileList package_name={package_name} pointer={pointer} data={result} />
      )}
    </section>
  );
};

export default FileBrowser;
