import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaRegCreditCard } from "react-icons/fa";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CartCheckoutButtonProps {
  children: React.ReactNode;
}

const CartCheckoutButton = ({ children }: CartCheckoutButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="lg">
          <div className="flex items-center justify-center gap-x-2">
            CheckOut
            <FaRegCreditCard className="h-3 w-3" />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 w-auto bg-transparent border-none">
        <ScrollArea className="h-[650px] rounded-md border">
          {children}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CartCheckoutButton;
