import toast from "react-hot-toast";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { useEditor } from "./editorContext";
import { Save } from "lucide-react";
import { Tooltip } from "~/components/ui/tooltip";

export function SaveButton({ packageName }: { packageName: string }) {
  const { mutateAsync } = api.package.updatePackage.useMutation();
  const { files } = useEditor();
  return (
    <Tooltip tip="Save your changes">
      <Button
        variant="ghost"
        onClick={() =>
          toast.promise(mutateAsync({ name: packageName, data: files }), {
            loading: "Saving...",
            success: "Saved!",
            error: "something went wrong",
          })
        }
      >
        <Save />
      </Button>
    </Tooltip>
  );
}
