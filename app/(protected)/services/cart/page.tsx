import CartBookList from "@/components/services/cart/cartbook-list";
import { getListBooksInCartByCartId } from "@/data/book";
import { getListCartBookByCartId } from "@/data/cart-book";
import { useCurrentCart } from "@/hooks/use-current-cart";
import { Book, CartBook } from "@prisma/client";
import { useEffect, useState } from "react";

const CartPage = async () => {
  return (
    <div>
      <h2>Your Carts</h2>
      <CartBookList />
    </div>
  );
};

export default CartPage;
