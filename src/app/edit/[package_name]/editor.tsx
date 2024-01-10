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
        <div>no file open</div>
      )}
    </div>
  );
}
