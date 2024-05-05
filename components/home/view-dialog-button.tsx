"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ViewDetail from "@/components/home/view-detail";

interface ViewAddDialogButtonProps {
  children: React.ReactNode;
  bookId: string;
  asChild?: boolean;
}

const ViewAddDialogButton = ({
  children,
  bookId,
  asChild,
}: ViewAddDialogButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      <DialogContent className="p-0 w-auto bg-transparent border-none">
        <ViewDetail bookId={bookId} />
      </DialogContent>
    </Dialog>
  );
};

export default ViewAddDialogButton;
