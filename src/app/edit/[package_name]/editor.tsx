import { langs } from "@uiw/codemirror-extensions-langs";
import ReactCodeMirror, { EditorView } from "@uiw/react-codemirror";
import { jgetDark } from "~/components/codemirrorTheme";
import { getContent } from "~/lib/getContent";
import { useEditor } from "./editorContext";

export function Editor() {
  const { openFile, files, update } = useEditor();

  const content = getContent(files, openFile);
  return (
    <div>
      {typeof content === "string" ? (
        <ReactCodeMirror
          key={openFile.join("/")}
          value={content}
          theme={jgetDark}
          onChange={(e) => update(e, openFile)}
          extensions={[EditorView.lineWrapping, langs.lua()]}
        />
      ) : (
        <div>no file open</div>
      )}
    </div>
  );
}
