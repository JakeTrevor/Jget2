import Link from "next/link";

export default () => {
  return (
    <header className="navbar sticky top-0 bg-base-100 align-baseline">
      <Link href="/" className="btn-ghost btn font-title text-4xl normal-case">
        <h1>JGET</h1>
      </Link>
      <Link
        href="/packages"
        className="btn-ghost btn font-title  text-xl normal-case"
      >
        <h3>explore</h3>
      </Link>
    </header>
  );
};
