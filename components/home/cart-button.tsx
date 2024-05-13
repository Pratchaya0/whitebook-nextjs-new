"use client";

import { getCountBookInCartByCartId } from "@/data/cart-book";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useCurrentCart } from "@/hooks/use-current-cart";
import { useEffect, useState, useTransition } from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { useRouter } from "next/navigation";

const CartButton = () => {
  const cardId = useCurrentCart();
  const [numOfBookInCart, setNumOfBookInCart] = useState<number>();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const getCartCount = async () => {
    const count = await getCountBookInCartByCartId(cardId as string);
    setNumOfBookInCart(count as number);
  };

  useEffect(() => {
    startTransition(() => {
      getCartCount();
    });
  }, []);

  return (
    <Button
      size="lg"
      className="px-3"
      variant="outline"
      onClick={() => {
        router.push("/services/cart");
      }}
    >
      <FaShoppingBasket className="h-5 w-5 mr-1" />
      <Badge variant="outline">{numOfBookInCart}</Badge>
    </Button>
  );
};

export default CartButton;
