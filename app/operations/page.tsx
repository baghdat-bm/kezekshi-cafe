"use client";

import { Pizza, Coffee } from "lucide-react";

export default function Home() {
    return (
        <div className="flex gap-4">
            <Pizza size={32} className="text-red-500" />
            <Coffee size={32} className="text-yellow-500" />
        </div>
    );
}