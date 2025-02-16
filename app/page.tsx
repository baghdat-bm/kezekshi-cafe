import { logout } from "@/lib/utils";
import { Button } from "@/components/ui/button"
import { Pizza, Coffee } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const token = await cookies().get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  return (
    <div className="flex gap-4">
      <Pizza size={32} className="text-red-500" />
      <Coffee size={32} className="text-yellow-500" />

      <Button onClick={logout}>Выйти</Button>
    </div>
  );
}
