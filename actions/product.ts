"use server";

import { db } from "@/lib/db";

export const updateProductIsOnSale = async (
  bookId: string,
  isOnSale: boolean
) => {
  await db.book.update({
    where: {
      id: bookId,
    },
    data: {
      isOnSale: isOnSale,
    },
  });

  return { res: `Status product id="${bookId}" is updated!` };
};

export const deleteProduct = async (bookId: string) => {
  // TODO: delete image in firebase 

  await db.book.delete({
    where: {
      id: bookId,
    },
  });

  return { res: `Product id="${bookId}" is deleted!` };
};
