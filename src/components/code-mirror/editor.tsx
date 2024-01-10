import { langs } from "@uiw/codemirror-extensions-langs";
import ReactCodeMirror, {
  EditorView,
  type ReactCodeMirrorProps,
} from "@uiw/react-codemirror";
import { jgetTheme } from "./jget-theme";

type props = ReactCodeMirrorProps;

export default function CodeEditor(props: props) {
  return (
    <ReactCodeMirror
      {...props}
      theme={jgetTheme}
      extensions={[EditorView.lineWrapping, langs.lua()]}
    />
  );
}
