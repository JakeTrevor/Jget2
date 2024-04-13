import { CopyButton } from "~/components/CopyButton";

export const CopyPackage = ({ package_name }: { package_name: string }) => {
  return (
    <div>
      <h4 className="font-semibold italic">Install this package:</h4>
      <span className="text-bold flex items-center rounded-md bg-background p-3 font-code text-emerald-500 shadow-md">
        <p className="pr-2">
          $ <span className="text-foreground">jget get {package_name} </span>
        </p>
        <CopyButton text={`jget get ${package_name}`} />
      </span>
    </div>
  );
};
