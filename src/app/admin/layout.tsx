"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Packages" },
  { href: "/admin/bookings", label: "Bookings" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";

  const handleLogout = async () => {
    await fetch("/api/admin-logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  if (isLoginPage) {
    return <div className="min-h-screen bg-[#FAF8F4]">{children}</div>;
  }

  return (
    <div className="min-h-screen flex bg-[#FAF8F4]">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 bg-[#14213D] text-[#E8E4DC] flex flex-col justify-between">
        <div>
          <div className="px-6 py-7 border-b border-white/10">
            <Link href="/admin" className="font-heading text-xl tracking-wide text-white">
              Alps
            </Link>
            <p className="text-[11px] text-[#C9A66B] mt-0.5">Admin panel</p>
          </div>

          <nav className="px-3 py-6 flex flex-col gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2.5 text-sm transition-colors ${
                    active
                      ? "bg-white/10 text-white border-l-2 border-[#C9A66B] pl-[10px]"
                      : "text-[#B8BEC9] hover:text-white hover:bg-white/5 border-l-2 border-transparent pl-[10px]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="px-3 py-5 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2.5 text-sm text-[#B8BEC9] hover:text-white hover:bg-white/5 transition-colors"
          >
            Log out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <main className="px-10 py-9 max-w-5xl">{children}</main>
      </div>
    </div>
  );
}