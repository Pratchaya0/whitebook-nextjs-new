"use server";

import { db } from "@/lib/db";

export const getBookImagesByBookId = async (bookId: string) => {
  try {
    const bookImages = await db.bookPreviewImage.findMany({
      where: {
        bookId: bookId,
      },
    });

    return bookImages;
  } catch (error) {
    return null;
  }
};
