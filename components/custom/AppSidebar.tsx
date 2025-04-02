"use client";

import { usePathname } from 'next/navigation';
import {
    ShoppingBag, ClipboardMinus, ClipboardPlus, SendToBack, ChartBarStacked, Salad,
    Ruler, ContactRound, GraduationCap, HomeIcon, CircleUserRound
} from "lucide-react";
import Link from 'next/link';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import Header from "./Header";
import { useAuthStore } from "@/lib/store/auth";
import { Button } from "../ui/button";
import useTranslationStore from "@/lib/store/useTranslationStore";

// Menu items.
const document_navs = [
    {
        kz: "Сату",
        ru: "Продажа",
        en: "Sale",
        url: "/operations/selling-dishes",
        icon: ShoppingBag,
    },
    {
        kz: "Кірістер",
        ru: "Оприходование",
        en: "Registration",
        url: "/operations/incoming-invoices",
        icon: ClipboardPlus,
    },
    {
        kz: "Есептен шығару",
        ru: "Списание",
        en: "Write-downs",
        url: "/operations/write-offs",
        icon: ClipboardMinus,
    },
    {
        kz: "Жылжыту",
        ru: "Перемещение",
        en: "Moving",
        url: "/operations/movement-dishes",
        icon: SendToBack,
    }
];

const ref_navs = [
    {
        kz: "Тағам санаттары",
        ru: "Категории блюд",
        en: "Categories of dishes",
        url: "/admin/categories",
        icon: ChartBarStacked,
    },
    {
        kz: "Тағамдар",
        ru: "Блюда",
        en: "Dishes",
        url: "/admin/dishes",
        icon: Salad,
    },
    {
        kz: "Өлшем бірліктері",
        ru: "Единицы измерения",
        en: "Units of measurement",
        url: "/admin/units",
        icon: Ruler,
    },
    {
        kz: "Жеткізушілер",
        ru: "Поставщики",
        en: "Suppliers",
        url: "/admin/contractors",
        icon: ContactRound,
    },
    {
        kz: "Оқушылар",
        ru: "Учащиеся",
        en: "Students",
        url: "/admin/students",
        icon: GraduationCap,
    }
];

export function AppSidebar() {
    const { userData, logout } = useAuthStore();
    const pathname = usePathname();
    const { language, t } = useTranslationStore();

    return (
        <div>
            <Sidebar collapsible="icon" className="border-0">
                <SidebarHeader className="fixed inset-x-0 top-0 flex h-10 flex-row border-b bg-gray-100 hidden md:flex">
                    <Header />
                </SidebarHeader>

                <SidebarContent className="pt-11">
                    <SidebarGroup className="pt-0">
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem key="-1">
                                    <SidebarMenuButton asChild isActive={pathname === '/'}>
                                        <Link href='/'>
                                            <HomeIcon />
                                            <span></span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    <SidebarGroup className="pt-0">
                        <SidebarGroupLabel>{t("sidebar.documents")}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {document_navs.map((item) => (
                                    <SidebarMenuItem key={item[language]}>
                                        <SidebarMenuButton asChild isActive={pathname === item.url}>
                                            <Link href={item.url}>
                                                <item.icon />
                                                <span>{item[language]}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    <SidebarGroup className="pt-0">
                        <SidebarGroupLabel>{t("sidebar.refs")}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {ref_navs.map((item) => (
                                    <SidebarMenuItem key={item[language]}>
                                        <SidebarMenuButton asChild isActive={pathname === item.url}>
                                            <Link href={item.url}>
                                                <item.icon />
                                                <span>{item[language]}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton>
                                        <CircleUserRound />
                                        <span>{userData?.user_name}</span>
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                                    <DropdownMenuItem>
                                        <Button onClick={logout}>{t("sidebar.exit")}</Button>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
        </div>
    );
}
