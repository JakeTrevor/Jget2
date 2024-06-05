"use client";
import { Clipboard, ClipboardCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Tooltip } from "./ui/tooltip";

export const CopyButton = ({ text }: { text: string }) => {
  const [recent, setRecent] = useState(false);

  return (
    <Tooltip
      tip={recent ? "Copied!" : "Copy?"}
      delay={100}
      open={recent || undefined}
    >
      <Button
        disabled={recent}
        variant="outline"
        size="icon"
        className={`transition-transform active:-translate-y-2 `}
        onClick={async () => {
          await navigator.clipboard.writeText(text);
          setRecent(true);

          setTimeout(() => {
            setRecent(false);
          }, 3000);
        }}
      >
        {recent ? (
          <ClipboardCheck width="15" className="inline" />
        ) : (
          <Clipboard width="15" className="inline" />
        )}
      </Button>
    </Tooltip>
  );
};
