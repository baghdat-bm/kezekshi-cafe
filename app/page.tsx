'use client';

import { useRouter } from "next/navigation";
import { useAuthStore } from '@/lib/store/auth';
import DishCategories from '@/components/custom/categories/DishCategories';

export default function DashboardPage() {
    const router = useRouter();
    const token = useAuthStore((state) => state.accessToken);
    const erronOnRefreshToken = useAuthStore((state) => state.erronOnRefreshToken);

    if (erronOnRefreshToken) router.push("/login");

    if (!token) return <p>Загрузка...</p>;
    
    return (
        <main className="flex flex-col items-center p-6">
            <DishCategories token={token} />
        </main>
    );
}