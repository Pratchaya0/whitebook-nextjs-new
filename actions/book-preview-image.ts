"use server";

import { db } from "@/lib/db";

export const addBookPreviewImage = async (
  imagesUrl: string[],
  bookId: string
) => {
  if (!imagesUrl) {
    return;
  }

  try {
    imagesUrl.forEach(async (imageUrl) => {
      await db.bookPreviewImage.create({
        data: {
          imageUrl: imageUrl,
          bookId: bookId,
        },
      });
    });
    return { success: "Add preview image success" };
  } catch (error) {
    return { error: "Can not add preview image" };
  }
};

export const addBookPreviewImage_v2 = async (
  imageUrl: string,
  bookId: string
) => {

};
