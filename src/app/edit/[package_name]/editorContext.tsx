// import { type ReactNode, createContext, useContext } from "react";
// import { type Directory } from "~/types";

// interface EditorContext {
//   files: {
//     data: Directory;
//     update: (pointer: string[], content: string) => void;
//     commit: () => void;
//   };
//   dependencies: {
//     data: string[];
//     add: (name: string) => void;
//     remove: (name: string) => void;
//   };
// }

// const editorContext = createContext<EditorContext | undefined>(undefined);

// export const useEditor = () => {
//   const res = useContext(editorContext);

//   if (res === undefined)
//     throw Error("Cannot use Editor context outside of provider scope");

//   return res;
// };

// export const EditorProvider = ({
//   files,
//   dependencies,
//   children,
// }: {
//   files: Directory;
//   dependencies: string[];
//   children: ReactNode;
// }) => {
//   const d = { data: dependencies, add: () => null, remove: () => null };
//   return (
//     <editorContext.Provider value={{ dependencies: d }}>
//       {children}
//     </editorContext.Provider>
//   );
// };
