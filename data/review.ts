"use server";

import { db } from "@/lib/db";

export const getReviewsByBookId = async (bookId: string) => {
  try {
    const reviews = await db.review.findMany({
      where: {
        bookId: bookId,
      },
      orderBy: {
        craeteDate: "desc",
      },
    });

    return reviews;
  } catch (error) {
    return null;
  }
};

export const checkReviewByUserIdAndBookId = async (
  userId: string,
  bookId: string
) => {
  try {
    const existReview = await db.review.findFirst({
      where: {
        bookId: bookId,
        userId: userId,
      },
    });

    if (existReview) {
      return true;
    }

    return false;
  } catch (error) {
    return true;
  }
};
