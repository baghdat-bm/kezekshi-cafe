"use client";

import SelectDish from "@/components/custom/dishes/SelectDish";

// import { useAuthStore } from "@/lib/store/auth";
// import { Button } from "@/components/ui/button";

export default function Home() {
    // const { logout } = useAuthStore(); // Получаем функцию logout из Zustand

    return (
        <div className="flex gap-4 pt-3">
            {/* <h1>Добро пожаловать!</h1> */}
            {/* <Button onClick={logout}>Выйти</Button> */}
            <SelectDish/>
        </div>
    );
}