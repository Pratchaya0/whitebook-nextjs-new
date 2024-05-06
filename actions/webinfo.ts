"use server";

import { db } from "@/lib/db";
import { WebInformationSchema } from "@/schemas";
import * as z from "zod";

export const updateWebInfo = async (
  values: z.infer<typeof WebInformationSchema>
) => {
  const validatedFields = WebInformationSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, email, phone, facebook, line } = validatedFields.data;

  try {
    await db.webInformation.update({
      where: {
        id: "fixid",
      },
      data: {
        name: name?.trim(),
        email: email?.trim(),
        phone: phone?.trim(),
        facebook: facebook?.trim(),
        line: line?.trim(),
      },
    });
  } catch (error) {
    return { error: "Can not update web information" };
  }

  return { success: "Web Information is updated!" };
};
