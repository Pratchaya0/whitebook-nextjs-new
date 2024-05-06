"use server";

import { db } from "@/lib/db";
import { PaymentInformationSchema } from "@/schemas";
import * as z from "zod";

export const addPayment = async (
  values: z.infer<typeof PaymentInformationSchema>
) => {
  const validatedFields = PaymentInformationSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { paymentName, paymentCode, paymentImageUrl } = validatedFields.data;

  try {
    await db.paymentInformation.create({
      data: {
        paymentName: paymentName.trim(),
        paymentCode: paymentCode?.trim(),
        paymentImageUrl: paymentImageUrl?.trim(),
      },
    });
  } catch (error) {
    return { error: "Can not create Payment" };
  }

  return { success: "Payment created!" };
};

export const updatePayment = async (
  values: z.infer<typeof PaymentInformationSchema>,
  paymentId: string
) => {
  const validatedFields = PaymentInformationSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { paymentName, paymentCode, paymentImageUrl } = validatedFields.data;

  try {
    await db.paymentInformation.update({
      where: {
        id: paymentId,
      },
      data: {
        paymentName: paymentName.trim(),
        paymentCode: paymentCode?.trim(),
        paymentImageUrl: paymentImageUrl?.trim(),
      },
    });
  } catch (error) {
    return { error: "Can not update Payment" };
  }

  return { success: "Payment updated!" };
};

export const deletePayment = async (paymentId: string) => {
  await db.paymentInformation.delete({
    where: {
      id: paymentId,
    },
  });

  return { res: `Payment Id="${paymentId}" deleted!` };
};
