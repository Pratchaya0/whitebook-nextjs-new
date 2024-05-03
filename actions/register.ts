"use server";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";
import { createCartByUserId } from "@/data/cart";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) return { error: "Email already in use!" };

  await db.user.create({
    data: {
      name: name.trim(),
      email,
      password: hashedPassword,
    },
  });

  // สร้างตะกร้าสินค้า
  const userCreatedData = await getUserByEmail(email);
  if (!userCreatedData) return { error: "Something wrong user not created!" };
  const createCartResponse = await createCartByUserId(userCreatedData.id);
  if (!createCartResponse) return { error: "Something wrong user cart not created!!" };

  const verificationToken = await generateVerificationToken(email);
  //Send verification token email
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation email sent!" };
};
