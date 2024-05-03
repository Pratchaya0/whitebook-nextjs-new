// use in all client side can't use with async/await
import { useSession } from "next-auth/react";

export const useCurrentRole = () => {
  const session = useSession();

  return session.data?.user?.role;
};
