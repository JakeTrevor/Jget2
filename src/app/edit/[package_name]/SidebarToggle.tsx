"use client";

import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Button } from "~/components/ui/button";

export function SidebarToggle({
  open,
  toggle,
}: {
  open: boolean;
  toggle: () => void;
}) {
  return (
    <Button onClick={toggle} size="sm">
      {open ? <PanelLeftClose /> : <PanelLeftOpen />}
    </Button>
  );
}
