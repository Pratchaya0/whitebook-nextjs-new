"use server";
import { db } from "@/lib/db";

export const getWebInformation = async () => {
  try {
    const webinfo = await db.webInformation.findUnique({
      where: {
        id: "fixid",
      },
    });

    return webinfo;
  } catch (error) {
    return null;
  }
};
