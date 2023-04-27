import Link from "next/link";

export default () => {
  return (
    <header className="h-12 bg-slate-500">
      <Link href="/">
        <h1 className="text-4xl">JGET</h1>
      </Link>
    </header>
  );
};
