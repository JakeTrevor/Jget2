import { FC } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

import ReactCodeMirror from "@uiw/react-codemirror";
import { lua } from "@codemirror/legacy-modes/mode/lua";
import { StreamLanguage } from "@codemirror/language";
import { EditorView } from "codemirror";

import jgetDark from "../codemirrorTheme";

interface props {
  editable: boolean;
  data: string;
  file_name: string;
  pointer: string[];
  update: (data: string, pointer: string[]) => void;
}

let FileDisplay: FC<props> = ({
  data,
  file_name,
  editable,
  pointer,
  update,
}) => {
  let lang = getExtension(file_name);

  // TODO also add a markdown language thingy

  if (editable)
    return (
      <ReactCodeMirror
        value={data}
        theme={jgetDark}
        onChange={(e) => {
          update(e, pointer);
        }}
        extensions={[StreamLanguage.define(lua), EditorView.lineWrapping]}
      />
    );

  return (
    <>
      {lang === "md" ? (
        <div className="prose m-5 max-w-full rounded bg-base-200 p-2 prose-pre:bg-code">
          <ReactMarkdown
            components={{
              code({ inline, children }) {
                return !inline ? (
                  <ReactCodeMirror
                    readOnly={true}
                    value={String(children)}
                    theme={jgetDark}
                    extensions={[
                      StreamLanguage.define(lua),
                      EditorView.lineWrapping,
                    ]}
                  />
                ) : (
                  <code>{children}</code>
                );
              },
            }}
          >
            {data}
          </ReactMarkdown>
        </div>
      ) : (
        <ReactCodeMirror
          readOnly={true}
          value={data}
          theme={jgetDark}
          extensions={[StreamLanguage.define(lua), EditorView.lineWrapping]}
        />
      )}
    </>
  );
};

function getExtension(file_name: string) {
  if (!file_name.includes(".")) return "lua";

  return file_name.split(".").at(-1) || "lua";
}

export default FileDisplay;
