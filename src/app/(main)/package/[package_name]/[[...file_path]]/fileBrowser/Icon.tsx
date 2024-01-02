import { Folder, File, FileBox } from "lucide-react";
// import LuaFile from "~/icons/luaFile.svg";
// import MarkdownFile from "~/icons/markdownFile.svg";

export const Icon = ({ item, data }: { item: string; data: Directory }) => {
  if (typeof data[item] !== "string") return <Folder size={15} />;

  if (item.endsWith(".lua")) return <>lua</>;

  if (item.endsWith(".md")) return <>md</>;

  if (item.toLowerCase() === "dependencies.txt") return <FileBox size={15} />;

  return <File size={15} />;
};

export default Icon;
