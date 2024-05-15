"use server";

import { db } from "@/lib/db";
import { BookSchema } from "@/schemas";
import * as z from "zod";

export const addProduct = async (values: z.infer<typeof BookSchema>) => {
  const validatedFields = BookSchema.safeParse(values);

  if (!validatedFields.success) {
    // return { error: "Invalid fields!" };
    return null;
  }

  const {
    name,
    description,
    coverImage,
    price,
    writer,
    publisher,
    isOnSale,
    bookUrl,
    categoryId,
  } = validatedFields.data;

  try {
    const book = await db.book.create({
      data: {
        name,
        description,
        coverImageUrl: coverImage,
        price,
        writer,
        publisher,
        isOnSale,
        bookUrl,
        categoryId,
      },
    });

    return book;
  } catch (error) {
    return null;
  }
};

export const updateProductIsOnSale = async (
  bookId: string,
  isOnSale: boolean
) => {
  await db.book.update({
    where: {
      id: bookId,
    },
    data: {
      isOnSale: isOnSale,
    },
  });

  return { res: `Status product id="${bookId}" is updated!` };
};

export const deleteProduct = async (bookId: string) => {
  // TODO: delete image in firebase

  await db.book.delete({
    where: {
      id: bookId,
    },
  });

  return { res: `Product id="${bookId}" is deleted!` };
};
