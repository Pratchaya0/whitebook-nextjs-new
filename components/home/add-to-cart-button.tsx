"use client";

import { addToCart } from "@/actions/add-to-cart";
import { Button } from "@/components/ui/button";
import { useCurrentCart } from "@/hooks/use-current-cart";
import { useState, useTransition } from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { toast } from "sonner";

interface AddToCartButtonProps {
  bookId: String;
}

const AddToCartButton = ({ bookId }: AddToCartButtonProps) => {
  const cartId = useCurrentCart();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    setError("");
    setSuccess("");

    toast.promise(
      new Promise((resolve) => {
        startTransition(() => {
          addToCart(cartId as string, bookId as string)
            .then((res) => {
              if (res?.error) {
                setError(res?.error);
              }

              if (res?.success) {
                setSuccess(res?.success);
              }
            })
            .catch(() => {
              setError("Something went wrong!");
            });
        });
        resolve({ res: "Temp" });
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
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => {
          onClick();
        }}
      >
        <FaShoppingBasket className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default AddToCartButton;
