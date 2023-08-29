import type { FC } from "react";

import File from "~/icons/file.svg";
import LuaFile from "~/icons/luaFile.svg";
import MarkdownFile from "~/icons/markdownFile.svg";
import DependencyFile from "~/icons/dependencyFile.svg";
import Folder from "~/icons/folder.svg";

interface props {
  item: string;
  data: Directory;
}

const Icon: FC<props> = ({ item, data }) => {
  if (typeof data[item] !== "string") return <Folder width={15} />;

  if (item.endsWith(".lua")) return <LuaFile width={15} />;

  if (item.endsWith(".md")) return <MarkdownFile width={15} />;

  if (item.toLowerCase() === "dependencies.txt")
    return <DependencyFile width={15} />;

  return <File className="text-white" width={15} />;
};

export default Icon;
