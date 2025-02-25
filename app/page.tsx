'use client';

import { useAuthStore } from '@/lib/store/auth';
import DishCategories from '@/components/custom/categories/DishCategories';

export default function DashboardPage() {
    const token = useAuthStore((state) => state.accessToken);

    if (!token) return <p>Загрузка...</p>;

    return (
        <main className="flex flex-col items-center p-6">
            <DishCategories token={token} />
        </main>
    );
}