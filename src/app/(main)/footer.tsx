import Link from "next/link";
import { Github } from "~/components/github";

export function Footer() {
  return (
    <div className="flex flex-row items-center justify-center p-10">
      <Link href={"https://github.com/jakeTrevor/jget2/"}>
        <Github />
      </Link>
    </div>
  );
}
