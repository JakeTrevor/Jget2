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
import { EditorProvider } from "./editorContext";

export const Display = ({
  files,
  packageName,
}: {
  files: Directory;
  packageName: string;
}) => {
  return (
    <EditorProvider initialFiles={files}>
      <Header packageName={packageName} />
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={10}>
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={90}>
          <Editor />
        </ResizablePanel>
      </ResizablePanelGroup>
    </EditorProvider>
  );
};
