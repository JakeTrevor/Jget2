import { type Metadata } from "next";
import { api } from "~/trpc/server";
import { PackageCount } from "./pkgCount";
import { InstallScript } from "./install-script";
import { Footer } from "./footer";

export const metadata: Metadata = {
  title: "JGET",
  description: "JGET Package Manager",
};

export default async function Home() {
  const pkg_count = await api.package.count.query();

  return (
    <main className="flex flex-col">
      <section className="grid min-h-[93vh] place-items-center bg-body">
        <div className="flex flex-col items-center gap-2 rounded-lg bg-background/20 p-5 shadow-lg dark:bg-background/70 lg:flex-row-reverse">
          <PackageCount count={pkg_count} />
          <div>
            <h1 className="text-4xl font-bold">
              A Package Manager for Computercraft
            </h1>
            <p>
              <p className="inline text-xs text-foreground/50">by</p> Jake
              Trevor
            </p>
          </div>
        </div>
      </section>

      <section className="my-10  grid w-3/5 place-items-center self-center rounded-lg bg-body p-10 text-xl shadow-lg">
        <h3 className="text-center text-2xl">Install with just one command:</h3>
        <InstallScript />
      </section>

      <section className="my-10 w-3/4 self-center text-xl">
        <h3 className="divider mb-8 text-3xl font-bold">Why use JGET?</h3>
        <div className="grid grid-cols-1 gap-x-1 gap-y-3 lg:grid-cols-2">
          <div className="inline">
            <h4 className="text-sky-500 inline font-title lg:text-lime-500">
              Move Code{" "}
            </h4>
            seamlessly between computers
          </div>
          <span>
            <h4 className="inline font-title text-lime-500">Collaborate </h4>
            with others
          </span>
          <span>
            <h4 className="inline font-title text-yellow-800">Reuse </h4>
            packages and modules
          </span>
          <span>
            <h4 className="inline font-title text-slate-500 lg:text-yellow-800">
              Access{" "}
            </h4>
            a community
          </span>
        </div>
      </section>

      <Footer />
    </main>
  );
}
