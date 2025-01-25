import { Chevron, FileIcon } from "~/components/icon";
import { directoryToList } from "~/lib/directoryToList";
import { useToggle } from "~/lib/useToggle";
import { cn } from "~/lib/utils";
import { type Directory } from "~/types";
import { useEditor } from "./editorContext";

export function Sidebar() {
  const { files } = useEditor();
  return (
    <section className="h-[95vh]">
      <div className="bg-body">files</div>
      <Directory content={files} pointer={[]} />
      <div className="bg-body">dependencies</div>
    </section>
  );
}

const Directory = ({
  content,
  pointer,
}: {
  content: Directory;
  pointer: string[];
}) => {
  return (
    <div className="pl-1">
      {directoryToList(content).map(([name, content]) =>
        typeof content === "string" ? (
          <File name={name} pointer={pointer} />
        ) : (
          <Folder name={name} content={content} pointer={pointer} />
        ),
      )}
    </div>
  );
};

const Folder = ({
  name,
  content,
  pointer,
}: {
  name: string;
  content: Directory;
  pointer: string[];
}) => {
  const [open, toggleOpen] = useToggle();

  pointer = pointer.concat([name]);

  return (
    <div>
      <button onClick={toggleOpen} className="flex flex-row items-center">
        <Chevron open={open} />
        <FileIcon item={name} folder={true} open={open} />
        <p className="pl-1">{name}</p>
      </button>
      <div className={cn("border-l-2", !open && "hidden")}>
        <Directory content={content} pointer={pointer} />
      </div>
    </div>
  );
};

const File = ({ name, pointer }: { name: string; pointer: string[] }) => {
  pointer = pointer.concat([name]);

  const { setSelectedFile, setOpenFile } = useEditor();
  return (
    <div
      className="flex flex-row items-center"
      onDoubleClick={() => setOpenFile(pointer)}
      onClick={() => setSelectedFile(pointer)}
    >
      <FileIcon item={name} />
      <p className="pl-1">{name}</p>
    </div>
  );
};
