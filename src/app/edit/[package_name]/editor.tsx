import dynamic from "next/dynamic";
import { getContent } from "~/lib/getContent";
import { useEditor } from "./editorContext";

const CodeEditor = dynamic(() => import("~/components/code-mirror/editor"));

export function Editor() {
  const { openFile, files, update } = useEditor();

  const content = getContent(files, openFile);
  return (
    <div>
      {typeof content === "string" ? (
        <CodeEditor
          key={openFile.join("/")}
          value={content}
          onChange={(e) => update(e, openFile)}
        />
      ) : (
        <div className="grid h-[95dvh] place-items-center bg-accent/20">
          <p>No File Selected</p>
        </div>
      )}
    </div>
  );
}
