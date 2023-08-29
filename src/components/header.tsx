import Link from "next/link";
import SearchBar from "./SearchBar";

export default () => {
  return (
    <header className="navbar sticky top-0 z-10 h-[7vh] bg-base-100 pb-3">
      <Link
        href="/"
        className="btn-ghost btn flex items-end pb-1 font-title normal-case text-primary"
      >
        <h1 className="text-4xl">JGET</h1>
      </Link>
      <Link
        href="/explore"
        className="btn-ghost btn flex items-end pb-0.5 font-title normal-case"
      >
        <h3 className="text-xl">explore</h3>
      </Link>
      <SearchBar />
    </header>
  );
};
