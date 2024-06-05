import Link from "next/link";
import SearchBar from "~/components/search-bar";
import { Button } from "~/components/ui/button";
import { ThemeToggle } from "~/components/ui/theme";

export const Header = () => {
  return (
    <header className="sticky top-0 z-10 flex h-[7vh] flex-row items-center gap-1 bg-background py-3">
      <Button asChild variant="ghost">
        <Link href="/" className="flex font-title">
          <h1 className="pb-3 text-4xl">JGET</h1>
        </Link>
      </Button>
      <Button asChild variant="ghost">
        <Link href="/explore" className="flex font-title">
          <h3 className="text-xl">explore</h3>
        </Link>
      </Button>
      <SearchBar />
      <ThemeToggle />
    </header>
  );
};
