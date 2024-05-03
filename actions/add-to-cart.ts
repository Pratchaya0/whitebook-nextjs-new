"use server";

import { db } from "@/lib/db";

export const addToCart = async (cartId: string, bookId: string) => {
  try {
    await db.cartBook.create({
      data: {
        cartId: cartId,
        bookId: bookId,
      },
    });

    return { success: "Product added to Cart" };
  } catch (error) {
    return { error: "Oops! something wrong" };
  }
};
