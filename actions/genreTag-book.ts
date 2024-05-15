"use server";

import { db } from "@/lib/db";

export const addGenreTagBookByGenreTagId = async (
  genreTagsId: string[],
  bookId: string
) => {
  if (genreTagsId.length === 0) {
    return;
  }

  try {
    genreTagsId.forEach(async (genreTagId) => {
      await db.genreTagBook.create({
        data: {
          genreTagId: genreTagId,
          bookId: bookId,
        },
      });
    });

    return { success: "Add genre tag success" };
  } catch (error) {
    return { error: "Can not add book genre" };
  }
};
