"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/auth";
import { usePathname, useRouter } from "next/navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, refreshAccessToken } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      await refreshAccessToken();
    };
    checkAuth();
  }, [refreshAccessToken]);
  
  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated === false && pathname !== "/login") {
        router.push("/login");
      } else if (isAuthenticated && pathname === "/login") {
        router.push("/");
      }
    }
  }, [isLoading, isAuthenticated, pathname, router]);

  if (isLoading || isAuthenticated === null) {
    return <div className="flex justify-center items-center h-screen">Загрузка...</div>;
  }

  return <>{children}</>;
}
