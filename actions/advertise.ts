"use server";

import { db } from "@/lib/db";
import { AdvertisementSchema } from "@/schemas";
import * as z from "zod";

export const addAdvertise = async (
  values: z.infer<typeof AdvertisementSchema>
) => {
  const validatedFields = AdvertisementSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { title, description, highlightDescription, advertiseImageUrl } =
    validatedFields.data;

  try {
    await db.advertisement.create({
      data: {
        title: title.trim(),
        description: description.trim(),
        highlightDescription: highlightDescription.trim(),
        advertiseImageUrl: advertiseImageUrl?.trim(),
      },
    });
  } catch (error) {
    return { error: "Can not create advertise" };
  }

  return { success: "Advertise created!" };
};

export const updateAdvertise = async (
  values: z.infer<typeof AdvertisementSchema>,
  advertiseId: string
) => {
  const validatedFields = AdvertisementSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { title, description, highlightDescription, advertiseImageUrl } =
    validatedFields.data;

  try {
    await db.advertisement.update({
      where: {
        id: advertiseId,
      },
      data: {
        title: title.trim(),
        description: description.trim(),
        highlightDescription: highlightDescription.trim(),
        advertiseImageUrl: advertiseImageUrl?.trim(),
      },
    });
  } catch (error) {
    return { error: "Can not update advertise" };
  }

  return { success: "Advertise updated!" };
};

export const deleteAdvertise = async (advertiseId: string) => {
  await db.advertisement.delete({
    where: {
      id: advertiseId,
    },
  });

  return { res: `Advertise Id="${advertiseId}" deleted!` };
};
