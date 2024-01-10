import { api } from "~/trpc/server";

import { Display } from "./display";

export default async function EditPage({
  params: { package_name: packageName },
}: {
  params: { package_name: string };
}) {
  const data = await api.package.getByName.query(packageName);

  return (
    <main>
      <Display packageName={packageName} files={data.files} />
    </main>
  );
}
