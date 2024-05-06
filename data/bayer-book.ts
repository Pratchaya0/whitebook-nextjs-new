"use server";

import { db } from "@/lib/db";

export const checkIfBookInBuyerBookByBookId = async (
  bookId: string,
  userId: string
) => {
  const isExistBuyerBook = await db.bookBuyer.findFirst({
    where: {
      bookId: bookId,
      userId: userId,
    },
  });

  if (isExistBuyerBook) {
    return true as boolean;
  } else {
    return false as boolean;
  }
};

export const checkIfIsAvailableByBookId = async (
  bookId: string,
  userId: string
) => {
  const isExistBuyerBook = await db.bookBuyer.findFirst({
    where: {
      bookId: bookId,
      userId: userId,
      isAvailable: true,
    },
  });

  if (isExistBuyerBook) {
    return true as boolean;
  } else {
    return false as boolean;
  }
};
