import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: "ADMIN" | "USER";
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
  cartId: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
