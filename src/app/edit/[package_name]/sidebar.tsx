import { Chevron, FileIcon } from "~/components/Icon";
import { directoryToList } from "~/lib/directoryToList";
import { useToggle } from "~/lib/useToggle";
import { cn } from "~/lib/utils";
import { type Directory } from "~/types";

export function Sidebar({ files }: { files: Directory }) {
  return (
    <section className="h-[95vh]">
      <div className="bg-body">files</div>
      <Directory content={files} />
      <div className="bg-body">dependencies</div>
    </section>
  );
}

const Directory = ({ content }: { content: Directory }) => {
  return (
    <div className="pl-1">
      {directoryToList(content).map(([name, content]) =>
        typeof content === "string" ? (
          <File name={name} />
        ) : (
          <Folder name={name} content={content} />
        ),
      )}
    </div>
  );
};

const Folder = ({ name, content }: { name: string; content: Directory }) => {
  const [open, toggleOpen] = useToggle();
  return (
    <div>
      <button onClick={toggleOpen} className="flex flex-row items-center">
        <Chevron open={open} />
        <FileIcon item={name} folder={true} open={open} />
        <p className="pl-1">{name}</p>
      </button>
      <div className={cn("border-l-2", !open && "hidden")}>
        <Directory content={content} />
      </div>
    </div>
  );
};

const File = ({ name }: { name: string }) => {
  return (
    <div className="flex flex-row items-center">
      <FileIcon item={name} />
      <p className="pl-1">{name}</p>
    </div>
  );
};
