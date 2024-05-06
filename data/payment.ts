"use server";

import { db } from "@/lib/db";

export const getListPayments = async () => {
  try {
    const payments = await db.paymentInformation.findMany();

    return payments;
  } catch (error) {
    return null;
  }
};
