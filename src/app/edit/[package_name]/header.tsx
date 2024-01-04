import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { ThemeToggleSubmenu } from "~/components/ui/theme";
import { SidebarToggle } from "./SidebarToggle";

export function Header({
  sidebarOpen,
  toggleSidebar,
}: {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}) {
  return (
    <header className="width-full h-[5vh] bg-accent text-foreground">
      <SidebarToggle open={sidebarOpen} toggle={toggleSidebar} />
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
