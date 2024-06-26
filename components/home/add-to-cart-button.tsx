"use client";

import { addToCart } from "@/actions/cart";
import { Button } from "@/components/ui/button";
import { checkIfBookInBuyerBookByBookId } from "@/data/bayer-book";
import { useCountCart } from "@/hooks/use-cart-count";
import { useCurrentCart } from "@/hooks/use-current-cart";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useState, useTransition } from "react";
import { FaFunnelDollar, FaShoppingBasket } from "react-icons/fa";
import { toast } from "sonner";

interface AddToCartButtonProps {
  bookId: String;
  text?: string;
}

const AddToCartButton = ({ bookId, text }: AddToCartButtonProps) => {
  const cartId = useCurrentCart();
  const user = useCurrentUser();
  const { increase } = useCountCart();
  const [isPending, startTransition] = useTransition();
  const [isBookBought, setIsBookBought] = useState<boolean>(false);
  const checkBook = async () => {
    const data = await checkIfBookInBuyerBookByBookId(
      bookId as string,
      user?.id as string
    );
    setIsBookBought(data);
  };

  useEffect(() => {
    startTransition(() => {
      checkBook();
    });
  }, []);

  const onClick = () => {
    toast.promise(
      new Promise((resolve) => {
        startTransition(() => {
          resolve(addToCart(cartId as string, bookId as string));
        });
      }),
      {
        loading: "Loading...",
        success: (data: any) => {
          switch (data.code) {
            case 1:
              break;

            default:
              increase();
              break;
          }
          return `${data.success as string}`;
        },
        error: "Oops! what's wrong?",
      }
    );
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        disabled={isPending || isBookBought}
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => {
          onClick();
        }}
      >
        <div className="flex items-center gap-x-2">
          {text && !isBookBought && <p>{text}</p>}
          {text && isBookBought && <p>Pending</p>}
          {isBookBought ? (
            <FaFunnelDollar className="h-5 w-5" />
          ) : (
            <FaShoppingBasket className="h-5 w-5" />
          )}
        </div>
      </Button>
    </div>
  );
};

export default AddToCartButton;
