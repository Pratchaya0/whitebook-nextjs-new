import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { FaFileSignature } from "react-icons/fa";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface UpdateDialogButtonProps {
  title?: string;
  children: React.ReactNode;
}

const UpdateDialogButton = ({
  children,
  title = "Update",
}: UpdateDialogButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="h-8 p-x-2">
          <div className="flex items-center justify-center gap-x-2">
            {title}
            <FaFileSignature className="h-3 w-3" />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 w-auto bg-transparent border-none">
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDialogButton;
