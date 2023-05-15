import { FC, useEffect, useRef, useState } from "react";
import Loading from "../Loading";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import ReactCodeMirror from "@uiw/react-codemirror";
import { atomone } from "@uiw/codemirror-theme-atomone";
import { lua } from "@codemirror/legacy-modes/mode/lua";
import { StreamLanguage } from "@codemirror/language";

interface props {
  data: string;
  file_name: string;
  pointer: string[];
  update: any;
}

let FileDisplay: FC<props> = ({ data, file_name, pointer, update }) => {
  let [hljs, setHljs] = useState(false);

  useEffect(() => {
    import("highlight.js").then((hljs) => {
      setHljs(true);
      hljs.default.highlightAll();
    });
  }, []);

  let lang = getExtension(file_name);

  return (
    <>
      <ReactCodeMirror
        value={data}
        theme={atomone}
        onChange={(e) => {
          update(e, pointer);
        }}
        extensions={[StreamLanguage.define(lua)]}
      />
      {/* {lang === "md" ? (
        <div className="prose mt-5 max-w-full rounded bg-base-200 p-2">
          <ReactMarkdown>{data}</ReactMarkdown>
        </div>
      ) : (
        <>
          <div className={`${hljs ? "" : "hidden"}`}>
            <pre>
              <code className={`language-${lang}`}>{data}</code>
            </pre>
          </div>
          {!hljs && <Loading />}
        </>
      )} */}
    </>
  );
};

function getExtension(file_name: string) {
  if (!file_name.includes(".")) return "lua";

  return file_name.split(".").at(-1) || "lua";
}

export default FileDisplay;
