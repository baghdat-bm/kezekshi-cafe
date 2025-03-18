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

// Menu items.
const document_navs = [
    {
        title: "Продажа",
        url: "/operations/selling-dishes",
        icon: ShoppingBag,
    },
    {
        title: "Оприходование",
        url: "/operations/incoming-invoices",
        icon: ClipboardPlus,
    },
    {
        title: "Списание",
        url: "/operations/write-offs",
        icon: ClipboardMinus,
    },
    {
        title: "Перемещение",
        url: "/operations/movement-dishes",
        icon: SendToBack,
    }
];

const ref_navs = [
    {
        title: "Категории блюд",
        url: "/admin/categories",
        icon: ChartBarStacked,
    },
    {
        title: "Блюда",
        url: "/admin/dishes",
        icon: Salad,
    },
    {
        title: "Единицы измерения",
        url: "/admin/units",
        icon: Ruler,
    },
    {
        title: "Поставщики",
        url: "/admin/contractors",
        icon: ContactRound,
    },
    {
        title: "Учащиеся",
        url: "/admin/students",
        icon: GraduationCap,
    }
];

export function AppSidebar() {
    const { userData, logout } = useAuthStore();
    const pathname = usePathname();

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
                        <SidebarGroupLabel>Документы</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {document_navs.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild isActive={pathname === item.url}>
                                            <Link href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    <SidebarGroup className="pt-0">
                        <SidebarGroupLabel>Справочники</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {ref_navs.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild isActive={pathname === item.url}>
                                            <Link href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
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
                                        <Button onClick={logout}>Выйти</Button>
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
