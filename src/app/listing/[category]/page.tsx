import { prisma } from "@/lib/prisma";
import PackagesGrid from "@/components/sections/PackagesGrid"; // apna actual import path check kar lena
import { notFound } from "next/navigation";

export default async function ListingPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);

  const packages = await prisma.package.findMany({
    where: {
      category: { equals: decodedCategory, mode: "insensitive" },
    },
    orderBy: { createdAt: "desc" },
  });

  if (packages.length === 0) {
    // Category exist hi nahi karti ya abhi koi package nahi hai
    // Agar chaho to 'no packages found' UI dikha sakte ho, filhal notFound() use kiya
    const categoryExists = await prisma.package.findFirst({
      where: { category: { equals: decodedCategory, mode: "insensitive" } },
    });
    if (!categoryExists) {
      // Category bilkul exist hi nahi karti
    }
  }

  return <PackagesGrid packages={packages} category={decodedCategory} />;
}