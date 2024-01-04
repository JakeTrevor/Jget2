import { FolderUp } from "lucide-react";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import { Tooltip } from "~/components/ui/tooltip";

export function BackButton({
  pointer,
  package_name,
}: {
  pointer: string[];
  package_name: string;
}) {
  const backDest =
    pointer.length > 0
      ? `/package/${package_name}/${pointer.slice(0, -1).join("/")}`
      : `/package/${package_name}`;

  return (
    <Tooltip tip="back">
      <Button variant="ghost" asChild>
        <Link href={backDest}>
          <FolderUp size={15} />
        </Link>
      </Button>
    </Tooltip>
  );
}
