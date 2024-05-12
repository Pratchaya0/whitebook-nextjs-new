"use server";

import { db } from "@/lib/db";
import { ReviewSchema } from "@/schemas";
import * as z from "zod";

export const addReviews = async (values: z.infer<typeof ReviewSchema>) => {
  const validatedFields = ReviewSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { rating, comment, bookId, userId } = validatedFields.data;

  try {
    await db.review.create({
      data: {
        rating: 5,
        comment: comment?.trim(),
        bookId: bookId.trim(),
        userId: userId.trim(),
      },
    });

    return { success: "Add Your Review!" };
  } catch (error) {
    return { error: "Oops something wrong!" };
  }
};

export const updateReview = async (
  values: z.infer<typeof ReviewSchema>,
  reviewId: string
) => {
  const validatedFields = ReviewSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { rating, comment, bookId, userId } = validatedFields.data;

  const existReview = await db.review.findUnique({
    where: {
      id: reviewId,
    },
  });

  if (!existReview) {
    return { error: "This review dose not exits" };
  }

  try {
    await db.review.update({
      where: {
        id: reviewId,
      },
      data: {
        rating: 5,
        comment: comment,
        userId: existReview.userId,
        bookId: existReview.bookId,
      },
    });

    return { success: "Your review is updated" };
  } catch (error) {
    return { error: "Oops something went wrong" };
  }
};

export const deleteReview = async (reviewId: string) => {
  await db.review.delete({
    where: {
      id: reviewId,
    },
  });

  return { res: `Review Id="${reviewId}" deleted!` };
};
