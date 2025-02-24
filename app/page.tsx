'use client';

import { useAuthStore } from '@/lib/auth-store';
import DishCategories from '@/components/custom/DishCategories';

export default function DashboardPage() {
    const token = useAuthStore((state) => state.accessToken);

    if (!token) return <p>Загрузка...</p>;

    return (
        <main className="flex flex-col items-center p-6">
            <DishCategories token={token} />
        </main>
    );
}