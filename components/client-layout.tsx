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
      if (isAuthenticated === null) {
        await refreshAccessToken();
      }
    };

    checkAuth();
  }, [isAuthenticated, refreshAccessToken]);

  useEffect(() => {
    if (!isLoading && isAuthenticated === false && pathname !== "/login") {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, pathname, router]);

  if (isLoading || isAuthenticated === null) {
    return <div className="flex justify-center items-center h-screen">Загрузка...</div>;
  }

  return <>{children}</>;
}
