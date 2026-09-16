"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();

  const hideFooter = pathname === "/contact" || pathname?.startsWith("/admin");

  if (hideFooter) return null;

  return <Footer />;
}