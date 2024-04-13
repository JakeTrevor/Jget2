import {
  createContext,
  useContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useState,
  useCallback,
} from "react";
import { type Directory } from "~/types";

interface EditorContext {
  selectedFile: string[];
  setSelectedFile: Dispatch<SetStateAction<string[]>>;
  openFile: string[];
  setOpenFile: Dispatch<SetStateAction<string[]>>;
  files: Directory;
  update: (text: string, pointer: string[]) => void;
}

const editorContext = createContext<EditorContext | undefined>(undefined);

export const useEditor = () => {
  const res = useContext(editorContext);

  if (res === undefined)
    throw Error("Cannot use Editor context outside of provider scope");

  return res;
};

export const EditorProvider = ({
  initialFiles,
  children,
}: {
  initialFiles: Directory;
  children: ReactNode;
}) => {
  const [files, setFiles] = useState(initialFiles);

  const update = useCallback(
    (text: string, pointer: string[]) => {
      setFiles((files) => {
        const copy = JSON.parse(JSON.stringify(files)) as Directory;

        function handleNested(
          current: Directory,
          pointer: string[],
          text: string,
        ): Directory {
          const key = pointer.shift();
          if (!key) throw new Error("invalid pointer");

          if (pointer.length === 0) {
            return { ...current, [key]: text };
          }

          return {
            ...current,
            [key]: handleNested(current, pointer, text),
          };
        }

        return handleNested(copy, pointer.slice(), text);
      });
    },
    [setFiles],
  );

  const [selectedFile, setSelectedFile] = useState<string[]>([]);
  const [openFile, setOpenFile] = useState<string[]>([]);

  return (
    <editorContext.Provider
      value={{
        selectedFile,
        setSelectedFile,
        openFile,
        setOpenFile,
        files,
        update,
      }}
    >
      {children}
    </editorContext.Provider>
  );
};
