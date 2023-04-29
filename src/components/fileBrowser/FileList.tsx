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
    <ul>
      {keys.map((key) => (
        <li>
          <Link href={`/packages/${package_name}/${key}`}>
            {typeof data[key] === "string" ? (
              <File width={15} />
            ) : (
              <Folder width={15} />
            )}
            {key}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default FileList;
