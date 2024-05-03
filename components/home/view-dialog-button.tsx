"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ViewDetail from "@/components/home/view-detail";

interface ViewDialogButtonProps {
  children: React.ReactNode;
  bookId: string;
  asChild?: boolean;
}

const ViewDialogButton = ({
  children,
  bookId,
  asChild,
}: ViewDialogButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      <DialogContent className="p-0 w-auto bg-transparent border-none">
        <ViewDetail bookId={bookId} />
      </DialogContent>
    </Dialog>
  );
};

export default ViewDialogButton;
