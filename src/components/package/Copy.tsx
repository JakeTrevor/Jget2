import type { FC } from "react";
import CopyButton from "../CopyButton";

interface props {
  package_name: string;
}

const component: FC<props> = ({ package_name }) => {
  return (
    <div>
      <h4 className="font-semibold italic">Install this package:</h4>
      <pre className="rounded-md bg-code p-3 text-emerald-500">
        $ <span className="text-white">jget get {package_name} </span>
        <CopyButton text={`jget get ${package_name}`} />
      </pre>
    </div>
  );
};

export default component;
