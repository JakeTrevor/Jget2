import { create } from "zustand";
import { type Directory } from "~/types";

type FilePath = string;

type EditorWindowPath = number[];

type SidebarState = Record<string, { open: boolean; children?: SidebarState }>;

type EditorState =
  | {
      type: "division";
      direction: "horizontal" | "vertical";
      children: EditorState[];
    }
  | {
      type: "editor";
      paths: FilePath[];
      active: number;
    }
  | { type: "empty" };

type store = {
  sidebar: SidebarState;
  editor: EditorState;
  files: Directory;

  rename: (fPath: FilePath, newName: string) => void;
  updateFile: (fPath: FilePath, content: string) => void;
  newFile: (fPath: FilePath, type: "file" | "directory") => void;
  deleteFile: (fPath: FilePath) => void;

  open: (ePath: EditorWindowPath, fPath: FilePath) => void;
  close: (ePath: EditorWindowPath) => void;
};

// @ts-expect-error todo
export const useEditor = create<store>((set, get) => ({
  sidebar: {},
  editor: { type: "empty" },
  files: {},

  open(ePath, fPath) {
    const { editor } = get();
    let target = ePath.reduce((acc, val) => {
      if (acc.type !== "division") throw Error("borke");
      return acc.children[val]!;
    }, editor);

    if (target.type === "division") throw Error("borke");

    if (target.type === "empty")
      target = {
        type: "division",
        direction: "horizontal",
        children: [
          {
            paths,
          },
        ],
      };

    set({ editor: target });
    return;
  },
}));
