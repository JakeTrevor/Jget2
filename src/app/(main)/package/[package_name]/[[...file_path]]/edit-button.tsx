import { FilePenLine } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import { Button } from "~/components/ui/button";
import { Tooltip } from "~/components/ui/tooltip";

export function EditButton({ packageName }: { packageName: string }) {
  const canEdit = true;
  if (!canEdit) return <Fragment />;

  return (
    <Tooltip tip="Edit this package">
      <Button variant="outline" asChild>
        <Link href={`/edit/${packageName}`}>
          <FilePenLine />
        </Link>
      </Button>
    </Tooltip>
  );
}
