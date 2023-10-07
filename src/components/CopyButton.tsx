import { useState, type FC } from "react";
import Clipboard from "~/icons/clipboard.svg";
import Tick from "~/icons/tick.svg";

interface props {
  text: string;
}

const CopyButton: FC<props> = ({ text }) => {
  const [recent, setRecent] = useState(false);

  return (
    <button
      data-tip={recent ? "Copied!" : "Copy?"}
      className={`tooltip ${
        recent ? "tooltip-open" : ""
      } p-1 transition-transform active:-translate-y-2 `}
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setRecent(true);

        setTimeout(() => {
          setRecent(false);
        }, 3000);
      }}
    >
      {recent ? (
        <Tick width="15" className="inline" />
      ) : (
        <Clipboard width="15" className="inline -translate-y-1 " />
      )}
    </button>
  );
};

export default CopyButton;
