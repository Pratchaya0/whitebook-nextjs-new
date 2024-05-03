import { db } from "@/lib/db";

export const getListOrders = async () => {
  try {
    const orders = await db.order.findMany({
      include: {
        orderBooks: true,
      },
    });

    return orders;
  } catch (error) {
    return null;
  }
};

export const getOrderById = async (orderId: string) => {
  try {
    const order = await db.order.findUnique({
      where: { id: orderId },
    });

    return order;
  } catch (error) {
    return null;
  }
};

export const getOrderByUserId = async (userId: string) => {
  try {
    const orders = await db.order.findMany({
      where: { userId: userId },
    });

    return orders;
  } catch (error) {
    return null;
  }
};
