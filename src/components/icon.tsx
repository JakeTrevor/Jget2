import { ChevronDown, ChevronRight } from "lucide-react";
import { File, FileBox, Folder, FolderOpen } from "lucide-react";
import LuaFile from "~/icons/luaFile.svg";
import MarkdownFile from "~/icons/markdownFile.svg";

export const FileIcon = ({
  item,
  folder = false,
  open = false,
}: {
  item: string;
  folder?: boolean;
  open?: boolean;
}) => {
  if (folder) {
    if (open) return <FolderOpen size={15} />;
    return <Folder size={15} />;
  }

  if (item.endsWith(".lua")) return <LuaFile width={15} />;

  if (item.endsWith(".md")) return <MarkdownFile width={15} />;

  if (item.toLowerCase() === "dependencies.txt") return <FileBox size={15} />;

  return <File size={15} />;
};

export const Chevron = ({ open }: { open: boolean }) =>
  open ? <ChevronDown size={15} /> : <ChevronRight size={15} />;
