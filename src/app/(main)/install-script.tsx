import { CopyButton } from "~/components/CopyButton";

export const InstallScript = () => {
  return (
    <span className="text-bold flex items-center rounded-md bg-background p-3 font-code text-emerald-500 shadow-md">
      <p className="pr-2">
        ${" "}
        <span className="text-foreground">
          wget http://jget.trevor.business/jget.lua
        </span>
      </p>
      <CopyButton text="wget http://jget.trevor.business/jget.lua" />
    </span>
  );
};
