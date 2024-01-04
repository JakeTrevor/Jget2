"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";
import { useToggle } from "~/lib/useToggle";

import { Editor } from "./editor";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

export default function EditPage() {
  const [sidebarOpen, toggleSidebar] = useToggle(true);
  return (
    <main>
      <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={10}>
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={90}>
          <Editor />
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
