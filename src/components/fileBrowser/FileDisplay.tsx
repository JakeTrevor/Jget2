import { FC, useEffect, useRef, useState } from "react";
import Loading from "../Loading";

interface props {
  data: string;
}

let FileDisplay: FC<props> = ({ data }) => {
  let [hljs, setHljs] = useState(false);

  let codeBlock = useRef<HTMLElement>(null);

  useEffect(() => {}, []);

  useEffect(() => {
    import("highlight.js").then((hljs) => {
      setHljs(true);
      if (!codeBlock.current) return;
      hljs.default.highlightElement(codeBlock.current);
    });
  }, [codeBlock]);

  return (
    <>
      <div className={`${hljs ? "" : "hidden"}`}>
        <pre>
          <code className="language-lua" ref={codeBlock}>
            {data}
          </code>
        </pre>
      </div>
      {!hljs && <Loading />}
    </>
  );
};

export default FileDisplay;
