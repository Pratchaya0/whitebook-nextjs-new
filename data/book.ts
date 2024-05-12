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
    return null;
  }
};

export const getSumOfAllBookInCartByCartId = async (cartId: string) => {
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

    let amount = 0;
    books.forEach((book) => {
      if (book.price !== null) {
        amount += parseFloat(book.price);
      }
    });

    return amount as number;
  } catch (error) {
    return 0 as number;
  }
};

export const getListBooksByUserId = async (userId: string) => {
  try {
    const books = await db.book.findMany({
      where: {
        bookBuyers: {
          some: {
            isAvailable: true,
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

export const getBookByBookIdAndUserId = async (
  bookId: string,
  userId: string
) => {
  try {
    const book = await db.book.findUnique({
      where: {
        id: bookId,
        bookBuyers: {
          some: {
            isAvailable: true,
            userId: userId,
          },
        },
      },
    });

    return book;
  } catch (error) {
    return null;
  }
};

export const getListBooksByOrderId = async (orderId: string) => {
  try {
    const books = await db.book.findMany({
      where: {
        orderBooks: {
          some: {
            orderId: orderId,
          },
        },
      },
    });

    return books;
  } catch (error) {
    return null;
  }
};

export const getSumOfListBooksByOrderId = async (orderId: string) => {
  try {
    const books = await db.book.findMany({
      where: {
        orderBooks: {
          some: {
            orderId: orderId,
          },
        },
      },
    });

    let amount = 0;
    books.forEach((book) => {
      if (book.price !== null) {
        amount += parseFloat(book.price);
      }
    });

    return amount as number;
  } catch (error) {
    return 0 as number;
  }
};
