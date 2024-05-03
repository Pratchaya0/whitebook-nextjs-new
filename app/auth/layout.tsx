import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex items-center justify-center bg-slate-500">{children}</div>
  );
};

export default AuthLayout;
