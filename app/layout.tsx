import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/custom/AppSidebar"
import { cookies } from "next/headers"

import "./globals.css";

import ClientLayout from "@/components/client-layout";
import MobileHeader from "@/components/custom/MobileHeader";
import ClientInterceptor from "@/components/ClientInterceptor";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Kezekshi Kassa",
    description: "Developed by baghdat.bm@gmail.com",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

    return (
        <html lang="ru">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                
                <SidebarProvider defaultOpen={defaultOpen}>
                    <ClientInterceptor />

                    {/* Мобильный хэдер, отображаемый только на маленьких экранах */}
                    <MobileHeader />

                    {/* Сайдбар, который может оставаться скрытым на мобильных */}
                    <AppSidebar />

                    <ClientLayout>
                        <div className="mx-8 pt-11">
                            <main>
                                {children}
                            </main>
                        </div>
                    </ClientLayout>
                </SidebarProvider>
            </body>
        </html>
    );
}
