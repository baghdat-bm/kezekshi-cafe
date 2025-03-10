import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/custom/app-sidebar"
import { cookies } from "next/headers"

import "./globals.css";

import ClientLayout from "@/components/client-layout";

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
                    <AppSidebar />

                    <ClientLayout>
                        <div className="mx-8 pt-11">
                            <main>
                                <SidebarTrigger />
                                {children}
                            </main>
                        </div>
                    </ClientLayout>
                </SidebarProvider>
            </body>
        </html>
    );
}
