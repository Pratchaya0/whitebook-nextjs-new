"use server";

import { db } from "@/lib/db";
import { GenreTagSchema } from "@/schemas";
import * as z from "zod";

export const addNewGenreTag = async (values: z.infer<typeof GenreTagSchema>) => {
  const validatedFields = GenreTagSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { genreTagName, userId } = validatedFields.data;

  try {
    await db.genreTag.create({
      data: {
        genreTagName: genreTagName,
        userId: userId,
      },
    });
  } catch (error) {
    return { error: "Oops! something went wrong!" };
  }

  return { success: "Genre tag created!" };
};

export const updateGenreTag = async (
  values: z.infer<typeof GenreTagSchema>,
  genreTagId: string
) => {
  const validatedFields = GenreTagSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { genreTagName, userId } = validatedFields.data;

  try {
    await db.genreTag.update({
      where: {
        id: genreTagId,
      },
      data: {
        genreTagName: genreTagName,
        userId: userId,
      },
    });
  } catch (error) {
    return { error: "Oops! something went wrong!" };
  }

  return { success: `Genre tag id="${genreTagId}" updated!` };
};

export const deleteGenreTag = async (genreTagId: string) => {
  await db.genreTag.delete({
    where: {
      id: genreTagId,
    },
  });

  return { res: `Genre tag Id="${genreTagId}" deleted!` };
};
