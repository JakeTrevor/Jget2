import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

import FileBrowser from "~/components/fileBrowser";
import Copy from "~/components/package/Copy";
import Stats from "~/components/package/Stats";
import { api } from "~/utils/api";

const Packages: NextPage = () => {
  const [files, setFiles] = useState({});
  const router = useRouter();

  // * This makes me hurt
  // eslint-disable-next-line prefer-const
  let { package_name, file_path } = router.query;

  file_path ||= [];
  if (typeof file_path === "string") file_path = [file_path];

  const { data } = api.package.getByName.useQuery(
    (package_name || "") as string,
    {
      onSuccess: ({ files }) => setFiles(files),
    },
  );

  const update = useCallback(
    (text: string, pointer: string[]) => {
      setFiles((files) => {
        const copy = JSON.parse(JSON.stringify(files)) as Directory;

        function handleNested(
          current: Directory,
          pointer: string[],
          text: string,
        ): Directory {
          const key = pointer.shift();
          if (!key) throw new Error("invalid pointer");

          if (pointer.length === 0) {
            return { ...current, [key]: text };
          }

          return {
            ...current,
            [key]: handleNested(current, pointer, text),
          };
        }

        return handleNested(copy, pointer.slice(), text);
      });
    },
    [setFiles],
  );

  const stats = {
    download_count: data?.downloads || 0,
    created_at: data?.createdAt || new Date(),
    updated_at: data?.updatedAt || new Date(),
  };

  if (typeof package_name !== "string") return <>invalid package name</>; //theoretical error

  return (
    <>
      <Head>
        <title>JGET | {package_name}</title>
        <meta name="description" content="JGET Package Manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-base-200">
        <section className="my-10 w-3/4">
          <h2 className="text-3xl font-bold">{package_name}</h2>
          <div className="divider" />
          <div className="flex flex-row justify-between">
            <Stats {...stats} />
            <Copy package_name={package_name} />
          </div>
        </section>
        {Object.keys(files).length !== 0 && (
          <FileBrowser
            update={update}
            package_name={package_name}
            data={files}
            pointer={file_path}
          />
        )}
      </main>
    </>
  );
};

export default Packages;
