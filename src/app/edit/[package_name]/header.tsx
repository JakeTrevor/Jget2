import Link from "next/link";
import { ThemeToggle } from "~/components/ui/theme";
import { SaveButton } from "./SaveButton";
import { Button } from "~/components/ui/button";

export function Header({ packageName }: { packageName: string }) {
  return (
    <header className="flex h-[5dvh] w-full flex-row items-baseline gap-4 p-1 text-foreground shadow-lg">
      <Button variant="ghost" className="font-title text-xl" asChild>
        <Link href="/">JGET</Link>
      </Button>
      <SaveButton packageName={packageName} />
      <ThemeToggle />
    </header>
  );
}
