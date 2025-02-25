"use client";

import { useAuthStore } from "@/lib/store/auth";
import { Button } from "@/components/ui/button";
import { Pizza, Coffee } from "lucide-react";

export default function Home() {
    const { logout } = useAuthStore(); // Получаем функцию logout из Zustand

    return (
        <div className="flex gap-4">
            <Pizza size={32} className="text-red-500" />
            <Coffee size={32} className="text-yellow-500" />

            <Button onClick={logout}>Выйти</Button>
        </div>
    );
}