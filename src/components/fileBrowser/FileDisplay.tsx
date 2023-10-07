import { type FC } from "react";
import Markdown from "react-markdown";

import { langs } from "@uiw/codemirror-extensions-langs";
import ReactCodeMirror from "@uiw/react-codemirror";
import { EditorView } from "codemirror";

import jgetDark from "../codemirrorTheme";

interface props {
  editable: boolean;
  data: string;
  file_name: string;
  pointer: string[];
  update: (data: string, pointer: string[]) => void;
}

const FileDisplay: FC<props> = ({
  data,
  file_name,
  editable,
  pointer,
  update,
}) => {
  const lang = getExtension(file_name);

  // TODO also add a languages

  if (editable)
    return (
      <ReactCodeMirror
        value={data}
        theme={jgetDark}
        onChange={(e) => {
          update(e, pointer);
        }}
        extensions={[EditorView.lineWrapping, langs.lua()]}
      />
    );

  return (
    <>
      {lang === "md" ? (
        <div className="prose m-5 max-w-full rounded bg-base-200 p-2 prose-pre:bg-code">
          <Markdown
            components={{
              code: ({ children, className }) => {
                const match = /language-(\w+)/.exec(className ?? "");
                return match ? (
                  <ReactCodeMirror
                    readOnly={true}
                    value={String(children)}
                    theme={jgetDark}
                    extensions={[EditorView.lineWrapping, langs.lua()]}
                  />
                ) : (
                  <code>{children}</code>
                );
              },
            }}
          >
            {data}
          </Markdown>
        </div>
      ) : (
        <ReactCodeMirror
          readOnly={true}
          value={data}
          theme={jgetDark}
          extensions={[EditorView.lineWrapping, langs.lua()]}
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
