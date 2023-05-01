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
    <table className="table w-full">
      <thead>
        <th>Type</th>
        <th>File Name</th>
      </thead>
      <tbody>
        {keys.map((key) => (
          <tr>
            <th className="w-1">
              {typeof data[key] === "string" ? (
                <File width={15} />
              ) : (
                <Folder width={15} />
              )}
            </th>
            <td>
              <Link href={`/packages/${package_name}/${key}`}>{key}</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FileList;
