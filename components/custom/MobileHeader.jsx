"use client";

import { useSidebar } from "@/components/ui/sidebar";

const MobileHeader = () => {
    const { toggleSidebar } = useSidebar();

    return (
        <div className="fixed top-0 left-0 w-full bg-gray-100 z-50 md:hidden">
            <button
                className="p-1 focus:outline-none"
                aria-label="Меню"
                onClick={toggleSidebar}
            >
                <svg width="24" height="24" viewBox="0 0 24 24">
                    <path
                        d="M4 6h16M4 12h16M4 18h16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            </button>
        </div>
    );
};

export default MobileHeader;