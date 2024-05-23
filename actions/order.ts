"use server";

import { getListBooksInCartByCartId } from "@/data/book";
import { db } from "@/lib/db";
import {
  sendConfirmedOrderEmailToUser,
  sendOrderCreatedEmailToAdmin,
} from "@/lib/mail";
import { OrderSchema } from "@/schemas";
import * as z from "zod";

export const updateOrderIsPaid = async (
  userId: string,
  orderId: string,
  isPaid: boolean
) => {
  await db.order.update({
    where: {
      id: orderId as string,
    },
    data: {
      isPaid: isPaid as boolean,
    },
  });

  const existOrderBooks = await db.orderBook.findMany({
    where: {
      orderId: orderId,
    },
  });
  if (!existOrderBooks) {
    return { res: "error: existOrderBooks" };
  }

  existOrderBooks.forEach(async (orderBook) => {
    await db.bookBuyer.updateMany({
      where: {
        userId: userId,
        bookId: orderBook.bookId as string,
      },
      data: {
        isAvailable: isPaid as boolean,
      },
    });
  });

  // Get user by userId
  const user = await db.user.findFirst({
    where: {
      id: userId,
    },
  });

  // send email to customer
  if (user) {
    await sendConfirmedOrderEmailToUser(user.email as string, orderId);
  }

  return { res: "Status is updated" };
};

export const createOrder = async (
  values: z.infer<typeof OrderSchema>,
  cartId: string
) => {
  const validatedFields = OrderSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { amount, userId, paymentImageUrl } = validatedFields.data;

  try {
    await db.order.create({
      data: {
        amount: amount,
        userId: userId,
        paymentImageUrl: paymentImageUrl,
      },
    });
  } catch (error) {
    return { error: "error: Create order" };
  }

  // get order
  const orderCreated = await db.order.findFirst({
    orderBy: {
      createdDate: "desc",
    },
  });
  if (!orderCreated) {
    return { error: "error: orderCreated" };
  }

  // find books in cart list
  const booksExistInCart = await getListBooksInCartByCartId(cartId);
  if (!booksExistInCart) {
    return { error: "error: booksExistInCart" };
  }

  // create detail order and buyer(owner)
  booksExistInCart.forEach(async (book) => {
    await db.$transaction([
      db.orderBook.create({
        data: {
          orderId: orderCreated.id,
          bookId: book.id,
        },
      }),
      db.bookBuyer.create({
        data: {
          userId: userId,
          bookId: book.id,
        },
      }),
    ]);
  });

  // clear cart
  try {
    await db.cartBook.deleteMany({
      where: {
        cartId: cartId,
      },
    });
  } catch (error) {
    {
      error: "error: deleteCartBook";
    }
  }

  // Get all admin in database
  const admins = await db.user.findMany({
    where: {
      role: "ADMIN",
    },
  });
  
  // Send email alert to admin
  if (admins) {
    admins.forEach(async (admin) => {
      await sendOrderCreatedEmailToAdmin(
        admin.email as string,
        orderCreated.id
      );
    });
  }

  return { success: "Successful!" };
};
