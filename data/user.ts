"use server";

import { db } from "@/lib/db";
import { User } from "@prisma/client";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string | undefined) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};

export const getListUsers = async () => {
  try {
    const users = await db.user.findMany();

    return users;
  } catch (error) {
    return null;
  }
};

export type UserWithAmountType = {
  id: string;
  name: string;
  email: string;
  emailVerified: Date;
  image: string;
  password: string;
  role: string;
  isTwoFactorEnabled: boolean;
  amount: number;
};

export const getListUserWithAmount = async () => {
  try {
    const users = await db.user.findMany({
      include: {
        orders: {
          select: {
            amount: true, // Select the amount field from orders
          },
        },
      },
    });

    const tmpUser: UserWithAmountType[] = [];
    users.forEach((user) => {
      let amount = 0;
      user.orders.forEach((order) => {
        if (order.amount) {
          amount += order.amount;
        }
      });
      tmpUser.push({
        id: user.id as string,
        name: user.name as string,
        email: user.email as string,
        role: user.role as string,
        isTwoFactorEnabled: user.isTwoFactorEnabled as boolean,
        amount: amount,
        emailVerified: user.emailVerified as Date, // Ensure this property exists in 'user'
        image: user.image as string, // Ensure this property exists in 'user'
        password: user.password as string, // Ensure this property exists in 'user'
      });
    });

    return tmpUser;
  } catch (error) {
    return null;
  }
};
