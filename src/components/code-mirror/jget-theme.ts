import { tags as t } from "@lezer/highlight";
import { createTheme } from "@uiw/codemirror-themes";

export const jgetTheme = createTheme({
  theme: "light",
  settings: {
    background: "var(--background)",
    foreground: "var(--foreground)",
    caret: "#5d00ff",
    selection: "#036dd626",
    selectionMatch: "#036dd626",
    lineHighlight: "#8a91991a",
    gutterBackground: "var(--accent)",
    gutterForeground: "var(--accent-foreground)",
  },
  styles: [
    { tag: t.comment, color: "#64748b" },
    { tag: t.variableName, color: "var(--foreground)" },
    { tag: [t.string, t.special(t.brace)], color: "#22c55e" },
    { tag: t.number, color: "#f89b7a" },
    { tag: t.bool, color: "#f89b7a" },
    { tag: t.null, color: "#f89b7a" },
    { tag: t.keyword, color: "#0ea5e9" },
    { tag: t.operator, color: "#0ea5e9" },
    { tag: t.className, color: "#0ea5e9" },
    { tag: t.definition(t.typeName), color: "#5c6166" },
    { tag: t.typeName, color: "#5c6166" },
    { tag: t.angleBracket, color: "#5c6166" },
    { tag: t.tagName, color: "#5c6166" },
    { tag: t.attributeName, color: "#5c6166" },
  ],
});
