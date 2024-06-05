"use client";
import dynamic from "next/dynamic";
import Markdown from "react-markdown";

const CodeEditor = dynamic(() => import("~/components/code-mirror/editor"));

export const FileDisplay = ({
  data,
  file_name,
}: {
  data: string;
  file_name: string;
}) => {
  const lang = getExtension(file_name);

  if (lang === "md")
    return (
      <div className="m-5 max-w-full rounded p-2">
        <Markdown
          components={{
            h1: (props) => {
              return <h1 className="my-2 text-3xl" {...props} />;
            },
            h2: (props) => {
              return <h1 className="my-2 text-2xl" {...props} />;
            },
            h3: (props) => {
              return <h1 className="my-2 text-xl" {...props} />;
            },
            a: (props) => {
              return <a className="underline decoration-dotted" {...props} />;
            },
            code: ({ children, className }) => {
              const match = /language-(\w+)/.exec(className ?? "");
              return match ? (
                <CodeEditor
                  value={String(children)}
                  className="my-2"
                  readOnly
                />
              ) : (
                <code className="bg-accent p-0.5 font-code text-accent-foreground">
                  {children}
                </code>
              );
            },
          }}
        >
          {data}
        </Markdown>
      </div>
    );

  return <CodeEditor readOnly className="my-2" value={data} />;
};

function getExtension(file_name: string) {
  if (!file_name.includes(".")) return "lua";

  return file_name.split(".").at(-1) ?? "lua";
}
