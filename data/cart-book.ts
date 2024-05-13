"use server";

import { db } from "@/lib/db";

export const getListCartBookByCartId = async (cartId: string) => {
  try {
    const cartBook = await db.cartBook.findMany({
      where: {
        cartId: cartId,
      },
    });

    return cartBook;
  } catch (error) {
    return null;
  }
};

export const getCountBookInCartByCartId = async (cartId: string) => {
  try {
    const books = await db.cartBook.findMany({
      where: {
        cartId: cartId,
      },
    });

    let count = 0;
    books.forEach((book) => {
      if (book) {
        count += 1;
      }
    });

    return count as number;
  } catch (error) {
    return 0 as number;
  }
};
