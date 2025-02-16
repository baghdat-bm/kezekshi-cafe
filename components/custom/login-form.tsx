"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Cookies from 'js-cookie'

export default function LoginForm() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/token/", { "username": phone, password });
      
      // Устанавливаем токен в HTTP cookie
      // document.cookie = `access-token=${response.data.access}; path=/; Secure; HttpOnly;`;
      Cookies.set('access-token', response.data.access, { expires: 1 }); // 1 days
      Cookies.set('refresh-token', response.data.refresh, { expires: 7 }); // 7 days
      
      router.push("/dashboard");
    } catch (err) {
      setError("Неверный телефон или пароль");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Вход</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input 
                type="text"
                placeholder="Телефон"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Input 
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" className="w-full">Войти</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
