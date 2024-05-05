import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa";

interface AddDialogButtonProps {
  title?: string;
  children: React.ReactNode;
}

const AddDialogButton = ({ children, title = "Add" }: AddDialogButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="lg">
          <div className="flex items-center justify-center gap-x-2">
            {title}
            <FaPlus className="h-3 w-3" />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 w-auto bg-transparent border-none">
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default AddDialogButton;
