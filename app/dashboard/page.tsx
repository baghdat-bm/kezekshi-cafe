import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  // const cooks = await cookies();
  // const token = cooks.get("access-token")?.value;

  // if (!token) {
  //   redirect("/login");
  // }

  return <div>Добро пожаловать в панель управления!</div>;
}
