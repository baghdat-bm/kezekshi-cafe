"use client";

// import { useAuthStore } from "@/lib/store/auth";
// import { Button } from "@/components/ui/button";

export default function Home() {
    // const { logout } = useAuthStore(); // Получаем функцию logout из Zustand

    return (
        <div className="flex gap-4">
            <h1>Добро пожаловать!</h1>
            {/* <Button onClick={logout}>Выйти</Button> */}
        </div>
    );
}