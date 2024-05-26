"use client";

import { logout } from "@/actions/logout";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

const LogoutButton = ({ children }: LogoutButtonProps) => {
  const router = useRouter();
  const onClick = () => {
    // logout().then(() => {
    //   router.refresh();
    // });
    toast.promise(
      new Promise((resolve) => {
        signOut();
        signOut();
        resolve({ res: "Temp" });
      }),
      {
        loading: "Loading...",
        success: (data) => {
          return `Logout Successful!`;
        },
        error: "Oops! what's wrong?",
      }
    );
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};

export default LogoutButton;
