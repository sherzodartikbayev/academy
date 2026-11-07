"use client";

import { SessionProvider } from "next-auth/react";

interface AuthProvidersProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProvidersProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
