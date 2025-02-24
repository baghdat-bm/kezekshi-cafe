"use client";

import { useState, useEffect } from "react";

const Header = () => {
    const [mounted, setMounted] = useState(false);
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => {
            setNow(new Date());
        }, 60000);

        return () => clearInterval(timer);
    }, []);

    if (!mounted) {
        // Можно вернуть простой placeholder или null, чтобы избежать несоответствия
        return null;
    }

    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const timeString = `${hours}:${minutes}`;

    const day = now.getDate().toString().padStart(2, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const year = now.getFullYear().toString().slice(-2);
    const dateString = `${day}.${month}.${year}`;

    const weekdays = [
        "Воскресенье",
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
    ];
    const dayOfWeek = weekdays[now.getDay()];

    return (
        <header className="flex items-center justify-between p-1 bg-gray-100">
            <button className="p-1 focus:outline-none" aria-label="Меню">
                <svg width="24" height="24" viewBox="0 0 24 24">
                    <path
                        d="M4 6h16M4 12h16M4 18h16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            </button>

            <div className="flex items-center space-x-4">
                <span>Столовая - справа</span>
                <span>{dayOfWeek}</span>
                <span>{dateString}</span>
                <span>{timeString}</span>
            </div>
        </header>
    );
};

export default Header;
