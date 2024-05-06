"use client";

import { addToCart } from "@/actions/cart";
import { Button } from "@/components/ui/button";
import { checkIfBookInBuyerBookByBookId } from "@/data/bayer-book";
import { useCurrentCart } from "@/hooks/use-current-cart";
import { useEffect, useState, useTransition } from "react";
import { FaFunnelDollar, FaShoppingBasket } from "react-icons/fa";
import { toast } from "sonner";

interface AddToCartButtonProps {
  bookId: String;
}

const AddToCartButton = ({ bookId }: AddToCartButtonProps) => {
  const cartId = useCurrentCart();
  const [isPending, startTransition] = useTransition();
  const [isBookBought, setIsBookBought] = useState<boolean>(false);
  const checkBook = async () => {
    const data = await checkIfBookInBuyerBookByBookId(bookId as string);
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
        success: (data) => {
          return `Book added to cart!`;
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
        {isBookBought ? (
          <FaFunnelDollar className="h-5 w-5" />
        ) : (
          <FaShoppingBasket className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
};

export default AddToCartButton;
