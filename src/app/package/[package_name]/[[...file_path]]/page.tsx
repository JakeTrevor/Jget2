import Head from "next/head";
import { api } from "~/trpc/server";
import { Stats } from "./Stats";
import { CopyPackage } from "./Copy";
import { Separator } from "~/components/ui/separator";

export default async function Package({
  params: { package_name: packageName, file_path: filePath = [] },
}: {
  params: { package_name: string; file_path: string[] };
}) {
  const data = await api.package.getByName.query(packageName);

  const { files } = data;

  //   const update = useCallback(
  //     (text: string, pointer: string[]) => {
  //       setFiles((files) => {
  //         const copy = JSON.parse(JSON.stringify(files)) as Directory;

  //         function handleNested(
  //           current: Directory,
  //           pointer: string[],
  //           text: string,
  //         ): Directory {
  //           const key = pointer.shift();
  //           if (!key) throw new Error("invalid pointer");

  //           if (pointer.length === 0) {
  //             return { ...current, [key]: text };
  //           }

  //           return {
  //             ...current,
  //             [key]: handleNested(current, pointer, text),
  //           };
  //         }

  //         return handleNested(copy, pointer.slice(), text);
  //       });
  //     },
  //     [setFiles],
  //   );

  const stats = {
    download_count: data?.downloads || 0,
    created_at: data?.createdAt || new Date(),
    updated_at: data?.updatedAt || new Date(),
  };

  if (typeof packageName !== "string") return <>invalid package name</>; //theoretical error

  return (
    <>
      <Head>
        <title>JGET | {packageName}</title>
        <meta name="description" content="JGET Package Manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-[93vh] flex-col items-center bg-accent">
        <section className="my-10 w-3/4">
          <h2 className="text-3xl font-bold">{packageName}</h2>
          <Separator className="my-4 bg-sky" />
          <div className="flex flex-row justify-between">
            <Stats {...stats} />
            <CopyPackage package_name={packageName} />
          </div>
        </section>
        {/* {Object.keys(files).length !== 0 && (
          <FileBrowser
            update={() => {
              return;
            }}
            package_name={packageName}
            data={files}
            pointer={filePath}
          />
        )} */}
      </main>
    </>
  );
}
