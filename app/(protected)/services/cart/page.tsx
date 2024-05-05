"use client";

import CartBookList from "@/components/services/cart/cartbook-list";
import { getListBooksInCartByCartId } from "@/data/book";
import { getListCartBookByCartId } from "@/data/cart-book";
import { useCurrentCart } from "@/hooks/use-current-cart";
import { Book, CartBook } from "@prisma/client";
import { useEffect, useState } from "react";

const CartPage = () => {
  const cartId = useCurrentCart();
  const [cartBooks, setCartBooks] = useState<Book[]>([]);

  useEffect(() => {
    const getCartBooks = async () => {
      const cartBooks = await getListBooksInCartByCartId(cartId as string);
      setCartBooks(cartBooks as Book[]);
    };

    getCartBooks();
  }, [cartId]);

  return (
    <div>
      <h2>Your Carts</h2>
      <CartBookList cartId={cartId as string} />
    </div>
  );
};

export default CartPage;
