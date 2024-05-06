"use server";

import { db } from "@/lib/db";

export const addToCart = async (cartId: string, bookId: string) => {
  await db.cartBook.create({
    data: {
      cartId: cartId,
      bookId: bookId,
    },
  });

  return { success: "Product added to Cart" };
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
    throw new Error("Cart book does not exist!");
  }

  await db.cartBook.delete({
    where: {
      id: cartBook?.id,
    },
  });

  return { res: "Product deleted on cart!" };
};
