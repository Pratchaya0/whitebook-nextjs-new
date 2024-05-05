"use server";

import { db } from "@/lib/db";

export const updateOrderIsPaid = async (orderId: string, isPaid: boolean) => {
  console.log(orderId + " " + isPaid);
  await db.order.update({
    where: {
      id: orderId as string,
    },
    data: {
      isPaid: isPaid as boolean,
    },
  });

  //TODO: send email to customer

  return { res: "Status is updated" };
};
