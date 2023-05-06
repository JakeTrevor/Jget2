import { FC, useEffect, useRef, useState } from "react";
import Loading from "../Loading";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

interface props {
  data: string;
  file_name: string;
}

let FileDisplay: FC<props> = ({ data, file_name }) => {
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
      {lang === "md" ? (
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
      )}
    </>
  );
};

function getExtension(file_name: string) {
  if (!file_name.includes(".")) return "lua";

  return file_name.split(".").at(-1) || "lua";
}

export default FileDisplay;
