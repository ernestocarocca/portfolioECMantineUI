"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";

interface AuthCtx {
  token: string | null;
  login: (t: string) => void;
  logout: () => void;
  ready: boolean; // hydration finished
}

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  /* read token once after client hydration */
  useEffect(() => {
    setToken(localStorage.getItem("authToken"));
    setReady(true);
  }, []);

  const login = (t: string) => {
    localStorage.setItem("authToken", t);
    setToken(t);
    router.push("/"); // go to dashboard
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    router.push("/login");
  };

  useEffect(() => {
    if (!ready) {
      return;
    }

    const onLoginPage = pathname.startsWith("/login");

    if (!token && !onLoginPage) {
      router.push("/login");
    } else if (token && onLoginPage) {
      router.push("/");
    }
  }, [ready, token, pathname, router]);

  return (
    <AuthContext.Provider value={{ token, login, logout, ready }}>
      {/* avoid FOUC while token is loading */}
      {ready && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
