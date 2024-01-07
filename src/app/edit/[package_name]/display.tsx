"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";
import { type Directory } from "~/types";

import { Editor } from "./editor";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

export const Display = ({ files }: { files: Directory }) => {
  return (
    <>
      <Header />
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={10}>
          <Sidebar files={files} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={90}>
          <Editor />
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
};
