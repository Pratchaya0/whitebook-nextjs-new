"use server";

import { db } from "@/lib/db";

export const addToCart = async (cartId: string, bookId: string) => {
  const exist = await db.cartBook.findFirst({
    where: {
      cartId: cartId,
      bookId: bookId,
    },
  });

  if (exist) {
    return { success: "This is Product already added to Cart", code: 1 };
  }

  await db.cartBook.create({
    data: {
      cartId: cartId,
      bookId: bookId,
    },
  });

  return { success: "Product added to Cart", code: 0 };
};

export const deleteBookFromCartByCartIdAndBookId = async (
  cartId: string,
  bookId: string
) => {
  const cartBook = await db.cartBook.findFirst({
    where: {
      cartId: cartId,
      bookId: bookId,
    },
  });

  if (!cartBook) {
    // throw new Error("Cart book does not exist!");
    return { res: "Cart book does not exist!", code: 1 };
  }

  await db.cartBook.delete({
    where: {
      id: cartBook?.id,
    },
  });

  return { res: "Product deleted on cart!", code: 0 };
};
