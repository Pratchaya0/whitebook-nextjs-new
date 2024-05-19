import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";

interface ViewImageDialogButtonProps {
  url: String;
  children: React.ReactNode;
}

const ViewImageDialogButton = ({
  children,
  url,
}: ViewImageDialogButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="lg">
          <div className="flex items-center justify-center gap-x-2">
            {children}
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 w-auto bg-transparent border-none">
        <div className="aspect-ratio">
          <Image
            src={url as string}
            width={450}
            height={350}
            alt="Banner Image"
            className="object-contain"
            priority
            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px" // Add this prop with appropriate values
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewImageDialogButton;
