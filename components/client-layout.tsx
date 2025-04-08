"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/auth";
import { usePathname, useRouter } from "next/navigation";
import useTranslationStore from "@/lib/store/useTranslationStore";
import { useCookies } from 'next-client-cookies';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, refreshAccessToken } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  const { setLanguage } = useTranslationStore();

  const cookies = useCookies();

  // При первом рендере загружаем переводы для языка по умолчанию
  useEffect(() => {
    const defaultLanguage = cookies.get("language_state") || "kz"

    // Если переводы еще не загружены, запускаем загрузку
    // if (Object.keys(useTranslationStore.getState().translations).length === 0) {
    //   setLanguage(defaultLanguage);
    // }
    useTranslationStore.getState();
    setLanguage(defaultLanguage);

  }, [setLanguage]);


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
