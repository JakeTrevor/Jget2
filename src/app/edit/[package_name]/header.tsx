import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { ThemeToggleSubmenu } from "~/components/ui/theme";

export function Header() {
  return (
    <header className="width-full h-[5vh] bg-accent text-foreground">
      <DropdownMenu>
        <DropdownMenuTrigger>JGET</DropdownMenuTrigger>
        <DropdownMenuContent>
          <ThemeToggleSubmenu />
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/">Home</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
