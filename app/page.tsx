'use client';

import { useRouter } from "next/navigation";
import { useAuthStore } from '@/lib/store/auth';
import useTranslationStore from "@/lib/store/useTranslationStore";

export default function HomePage() {
    const router = useRouter();
    const token = useAuthStore((state) => state.accessToken);
    const erronOnRefreshToken = useAuthStore((state) => state.erronOnRefreshToken);
    const { t } = useTranslationStore();

    if (erronOnRefreshToken) router.push("/login");

    if (!token) return <p>{t("home.loading")}</p>;
    
    return (
        <main className="flex flex-col items-center p-6">
            <div className="flex gap-4 pt-3">
             <h1>{t("home.welcome")}</h1>
        </div>
        </main>
    );
}