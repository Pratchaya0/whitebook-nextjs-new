import { useSession } from "next-auth/react";

export const useCurrentCart = () => {
  const session = useSession();

  return session.data?.user.cartId;
};
