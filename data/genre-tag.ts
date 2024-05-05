"use server";
import { db } from "@/lib/db";

export const getListGenreTag = async () => {
  try {
    const genreTag = await db.genreTag.findMany();

    return genreTag;
  } catch (error) {
    return null;
  }
};

export const getGenreTagById = async (genreTagId: string) => {
  try {
    const genreTag = await db.genreTag.findUnique({
      where: {
        id: genreTagId,
      },
    });

    return genreTag;
  } catch (error) {
    return null;
  }
};
