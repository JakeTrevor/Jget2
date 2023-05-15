import { FC } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

import ReactCodeMirror from "@uiw/react-codemirror";
import { lua } from "@codemirror/legacy-modes/mode/lua";
import { StreamLanguage } from "@codemirror/language";
import { EditorView } from "codemirror";

import jgetDark from "../codemirrorTheme";

interface props {
  data: string;
  file_name: string;
  pointer: string[];
  update: any;
}

let FileDisplay: FC<props> = ({ data, file_name, pointer, update }) => {
  let lang = getExtension(file_name);

  return (
    <>
      {lang === "md" && (
        <div className="prose my-5 max-w-full rounded bg-base-200 p-2 prose-pre:bg-code">
          <ReactMarkdown>{data}</ReactMarkdown>
        </div>
      )}

      <ReactCodeMirror
        value={data}
        theme={jgetDark}
        onChange={(e) => {
          update(e, pointer);
        }}
        extensions={[StreamLanguage.define(lua), EditorView.lineWrapping]}
      />
    </>
  );
};

function getExtension(file_name: string) {
  if (!file_name.includes(".")) return "lua";

  return file_name.split(".").at(-1) || "lua";
}

export default FileDisplay;
