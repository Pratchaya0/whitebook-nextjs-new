"use server";
import { db } from "@/lib/db";

export const getCartByUserId = async (userId: string) => {
  try {
    const cart = await db.cart.findFirst({
      where: {
        userId: userId,
      },
    });

    return cart;
  } catch (error) {
    return null;
  }
};

export const createCartByUserId = async (userId: string) => {
  try {
    await db.cart.create({
      data: {
        userId: userId,
      },
    });

    return true;
  } catch (error) {
    return false;
  }
};
