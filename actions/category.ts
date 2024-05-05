"use server";

import { db } from "@/lib/db";
import { CategorySchema } from "@/schemas";
import * as z from "zod";

export const addNewCategory = async (
  values: z.infer<typeof CategorySchema>
) => {
  const validatedFields = CategorySchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { categoryName, categoryIcon, userId } = validatedFields.data;

  try {
    await db.category.create({
      data: {
        categoryName: categoryName.toLowerCase().trim(),
        categoryIcon: categoryIcon?.trim(),
        userId: userId?.trim(),
      },
    });
  } catch (error) {
    return { error: "Oops! something went wrong!" };
  }

  return { success: "Category is Added!" };
};

export const updateCategory = async (
  values: z.infer<typeof CategorySchema>,
  categoryId: string
) => {
  const validatedFields = CategorySchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { categoryName, categoryIcon, userId } = validatedFields.data;

  try {
    await db.category.update({
      where: { id: categoryId },
      data: {
        categoryName: categoryName.toLowerCase().trim(),
        categoryIcon: categoryIcon?.trim(),
        userId: userId?.trim(),
      },
    });
  } catch (error) {
    return { error: "Oops! something went wrong!" };
  }

  return { success: "Category is Updated!" };
};

export const deleteCategory = async (categoryId: string) => {
  await db.category.delete({
    where: {
      id: categoryId,
    },
  });

  return { res: `Category Id="${categoryId}" deleted!` };
};
