"use client";

import { getCountBookInCartByCartId } from "@/data/cart-book";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useCurrentCart } from "@/hooks/use-current-cart";
import { useEffect, useState, useTransition } from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useCountCart } from "@/hooks/use-cart-count";
import { useCurrentUser } from "@/hooks/use-current-user";

const CartButton = () => {
  const cardId = useCurrentCart();
  const { count, update } = useCountCart();
  // const [numOfBookInCart, setNumOfBookInCart] = useState<number>();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const user = useCurrentUser();

  const getCartCount = async () => {
    // setNumOfBookInCart(count as number);
    if (user) {
      const count = await getCountBookInCartByCartId(cardId as string);
      update(count);
    } else {
      update(0);
    }
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
      <Badge variant="outline">{count}</Badge>
    </Button>
  );
};

export default CartButton;
