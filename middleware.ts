import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const isLoginPage = req.nextUrl.pathname === "/login";
  
  // Разрешаем доступ к / (домашней странице) для всех
  if (!token && isLoginPage) {
    return NextResponse.next();
  }

  // Авторизованных пользователей перенаправляем с /login на /
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Неавторизованных пользователей перенаправляем на /login, если они пытаются зайти на защищенные маршруты
  if (!token && req.nextUrl.pathname !== "/" && req.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"], // Применяем ко всем маршрутам, кроме статических файлов
};
