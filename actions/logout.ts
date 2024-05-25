"use server";

import { signOut } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const logout = async () => {
  await signOut({ redirect: true });
  return true
};
