"use server";

import { db } from "@/lib/db";

export const getListCategories = async () => {
  try {
    const categories = await db.category.findMany({
      orderBy: {
        createdDate: "desc",
      },
    });

    return categories;
  } catch (error) {
    return null;
  }
};

export const getCategoryById = async (categoryId: string) => {
  try {
    const category = await db.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    return category;
  } catch (error) {
    return null;
  }
};
