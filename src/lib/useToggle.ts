import { useState } from "react";

export function useToggle(initial = false) {
  const [state, setState] = useState(initial);

  const toggleState = () => setState((s) => !s);
  return [state, toggleState] as const;
}
