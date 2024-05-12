"use server";

import { db } from "@/lib/db";

export const getReviewsByBookId = async (bookId: string) => {
  try {
    const reviews = await db.review.findMany({
      where: {
        bookId: bookId,
      },
    });

    return reviews;
  } catch (error) {
    return null;
  }
};
