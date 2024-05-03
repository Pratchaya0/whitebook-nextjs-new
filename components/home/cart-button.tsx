"use client";

import { getCountBookInCartByCartId } from "@/data/cart-book";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useCurrentCart } from "@/hooks/use-current-cart";
import { useEffect, useState } from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { useRouter } from "next/navigation";

const CartButton = () => {
  const cardId = useCurrentCart();
  const [numOfBookInCart, setNumOfBookInCart] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const count = getCountBookInCartByCartId(cardId as string);
    console.log(count);
    setNumOfBookInCart(count as unknown as number);
  }, [cardId]);

  return (
    <Button
      size="lg"
      className="w-full"
      variant="outline"
      onClick={() => {
        console.log("go to cart page");
      }}
    >
      <FaShoppingBasket className="h-5 w-5" />
      <Badge variant="outline">{numOfBookInCart.toString()}</Badge>
    </Button>
  );
};

export default CartButton;
