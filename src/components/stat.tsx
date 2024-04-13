import { type ReactNode } from "react";

export const Stat = ({
  stat,
  title,
  icon,
}: {
  stat: string;
  title: string;
  icon: ReactNode;
}) => {
  return (
    <div className="grid grid-cols-2 grid-rows-2  bg-background">
      <div className="text-foreground/20">{title}</div>
      <div className="row-start-2 text-xl text-foreground">{stat}</div>
      <div className="row-span-2 place-self-center text-foreground">{icon}</div>
    </div>
  );
};
