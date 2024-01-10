import Link from "next/link";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "~/components/ui/menubar";
import { ThemeToggleSubmenu } from "~/components/ui/theme";
import { SaveButton } from "./SaveButton";

export function Header({ packageName }: { packageName: string }) {
  return (
    <header className="h-[5vh] w-full bg-red-100 text-foreground">
      <Menubar className="rounded-none">
        <MenubarMenu>
          <MenubarTrigger className="h-12 font-title text-xl">
            JGET
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Link href="/">Home</Link>
            </MenubarItem>
            <ThemeToggleSubmenu />
            <MenubarItem>
              <SaveButton packageName={packageName} />
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </header>
  );
}
