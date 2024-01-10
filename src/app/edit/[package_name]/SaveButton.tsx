import toast from "react-hot-toast";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { useEditor } from "./editorContext";
import { Save } from "lucide-react";

export function SaveButton({ packageName }: { packageName: string }) {
  const { mutateAsync } = api.package.updatePackage.useMutation();
  const { files } = useEditor();
  return (
    <Button
      onClick={() =>
        toast.promise(mutateAsync({ name: packageName, data: files }), {
          loading: "Saving...",
          success: "Saved!",
          error: "something went wrong",
        })
      }
    >
      <Save className="pr-1" /> save
    </Button>
  );
}
