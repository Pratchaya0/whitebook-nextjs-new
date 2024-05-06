"use server";

import { db } from "@/lib/db";

export const checkIfBookInBuyerBookByBookId = async (bookId: string) => {
  const isExistBuyerBook = await db.bookBuyer.findFirst({
    where: {
      bookId: bookId,
    },
  });

  if (isExistBuyerBook) {
    return true as boolean;
  } else {
    return false as boolean;
  }
};

export const checkIfIsAvailableByBookId = async (bookId: string) => {
  const isExistBuyerBook = await db.bookBuyer.findFirst({
    where: {
      bookId: bookId,
      isAvailable: true,
    },
  });

  if (isExistBuyerBook) {
    return true as boolean;
  } else {
    return false as boolean;
  }
};
