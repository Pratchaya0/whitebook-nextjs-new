import { db } from "@/lib/db";

export const getListBooks = async () => {
  try {
    const books = await db.book.findMany({
      where: {
        isOnSale: true,
      },
    });

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
        genreTags: true,
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
