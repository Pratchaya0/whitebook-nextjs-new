"use server";

import { db } from "@/lib/db";

export const getListAdvertise = async () => {
  try {
    const advertise = await db.advertisement.findMany();

    return advertise;
  } catch (error) {
    return null;
  }
};
