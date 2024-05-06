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
    const numOfBooks = await db.cartBook.count({
      where: {
        cartId: cartId,
      },
    });

    return numOfBooks as number;
  } catch (error) {
    return 0 as number;
  }
};


