import type { Metadata, ResolvingMetadata } from "next";

import { Separator } from "~/components/ui/separator";
import { api } from "~/trpc/server";
import { CopyPackage } from "./Copy";
import { Stats } from "./Stats";
import FileBrowser from "./fileBrowser";

export async function generateMetadata(
  {
    params: { package_name: packageName },
  }: {
    params: { package_name: string; file_path: string[] };
  },
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  return {
    title: `JGET | ${packageName}`,
    description: "JGET Package Manager",
  };
}

export default async function Package({
  params: { package_name: packageName, file_path: filePath = [] },
}: {
  params: { package_name: string; file_path: string[] };
}) {
  const data = await api.package.getByName.query(packageName);
  const { files } = data;

  return (
    <main className="flex min-h-[93vh] flex-col items-center bg-body">
      <section className="my-10 w-3/4">
        <h2 className="text-3xl font-bold">{packageName}</h2>
        <Separator className="my-4 bg-sky" />
        <div className="flex flex-row justify-between">
          <Stats {...data} />
          <CopyPackage package_name={packageName} />
        </div>
      </section>
      <FileBrowser
        package_name={packageName}
        files={files}
        pointer={filePath}
      />
    </main>
  );
}
