"use server";

import { db } from "@/lib/db";
import { Book } from "@prisma/client";

export const getListBooks = async (all?: boolean) => {
  try {
    let books: Book[] = [];
    if (all) {
      books = await db.book.findMany();
    } else {
      books = await db.book.findMany({
        where: {
          isOnSale: true,
        },
      });
    }

    return books;
  } catch (error) {
    return null;
  }
};

export const getBookByBookId = async (bookId: string) => {
  try {
    const book = await db.book.findUnique({
      where: {
        id: bookId,
      },
      include: {
        bookPreviewImages: true,
        reviews: true,
        genreTagBooks: true,
      },
    });

    return book;
  } catch (error) {
    return null;
  }
};

export const getListBooksInCartByCartId = async (cartId: string) => {
  try {
    const books = await db.book.findMany({
      where: {
        cardBooks: {
          some: {
            cartId: cartId,
          },
        },
      },
    });

    return books;
  } catch (error) {
    console.error("error at getListBooksInCartByCartId = " + error);
    return null;
  }
};

export const getListBooksByUserId = async (userId: string) => {
  try {
    const books = await db.book.findMany({
      where: {
        bookBuyers: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        bookBuyers: true,
      },
    });

    return books;
  } catch (error) {
    return null;
  }
};
