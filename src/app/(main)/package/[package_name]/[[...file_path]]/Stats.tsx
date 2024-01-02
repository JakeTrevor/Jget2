import { BadgePlus, ChevronsDown, Pen } from "lucide-react";
import { Stat } from "~/components/stat";
import { Separator } from "~/components/ui/separator";

export const Stats = ({
  download_count,
  created_at,
  updated_at,
}: {
  download_count: number;
  created_at: Date;
  updated_at: Date;
}) => {
  return (
    <div className="flex flex-row rounded-md bg-background p-2 shadow-md">
      <Stat
        title="Downloads"
        stat={download_count.toString()}
        icon={<ChevronsDown size={60} />}
      />
      <Separator orientation="vertical" className="mx-2" />
      <Stat
        title="Created On"
        stat={created_at.toLocaleDateString()}
        icon={<BadgePlus size={60} />}
      />
      <Separator orientation="vertical" className="mx-2" />
      <Stat
        title="Last Updated"
        stat={updated_at.toLocaleDateString()}
        icon={<Pen size={60} />}
      />
    </div>
  );
};
