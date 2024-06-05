import { BadgePlus, ChevronsDown, Pen } from "lucide-react";
import { Stat } from "~/components/stat";
import { Separator } from "~/components/ui/separator";

export const Stats = ({
  downloads,
  createdAt,
  updatedAt,
}: {
  downloads: number;
  createdAt: Date;
  updatedAt: Date;
}) => {
  return (
    <div className="flex flex-row rounded-md bg-background p-2 shadow-md">
      <Stat
        title="Downloads"
        stat={downloads.toString()}
        icon={<ChevronsDown size={60} />}
      />
      <Separator orientation="vertical" className="mx-2" />
      <Stat
        title="Created On"
        stat={createdAt.toLocaleDateString()}
        icon={<BadgePlus size={60} />}
      />
      <Separator orientation="vertical" className="mx-2" />
      <Stat
        title="Last Updated"
        stat={updatedAt.toLocaleDateString()}
        icon={<Pen size={60} />}
      />
    </div>
  );
};
