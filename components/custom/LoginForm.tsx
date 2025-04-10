"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/auth";
import Cookies from "js-cookie";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import useTranslationStore from "@/lib/store/useTranslationStore";

export default function CustomLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuthStore();
  const router = useRouter();
  const { t } = useTranslationStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
  
    try {
      const tokens = await login(username, password);
      Cookies.set("accessToken", tokens.access, { expires: 1, path: "/" });
      Cookies.set("refreshToken", tokens.refresh, { expires: 7, path: "/" });
  
      // Добавьте небольшую задержку для обновления состояния
      await new Promise(resolve => setTimeout(resolve, 100));
      router.push("/");
      router.refresh(); // Добавьте это для Next.js 13+
    } catch (err) {
      console.error(err);
      setError("Неверный логин или пароль");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card className="w-96 bg-gray-100 mb-80">
        <CardHeader>
          <CardTitle>{t("home.authorization")}</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 flex flex-col items-center">
              <Input className="bg-white"
                type="text"
                placeholder={t("home.userName")}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input className="bg-white"
                type="password"
                placeholder={t("home.password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" className="w-40 bg-blue-200 rounded-2xl">{t("home.enter")}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
