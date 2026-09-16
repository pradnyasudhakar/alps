import { prisma } from "@/lib/prisma";
import ListingHero from "@/components/listing/ListingHero";
import PackagesGrid from "@/components/listing/PackagesGrid";

export default async function AdventurePackagesPage() {
  const packages = await prisma.package.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <ListingHero title="Adventure Packages" image="/images/listing-hero.png" showSearch={false} />
      <PackagesGrid packages={packages} category="All Packages" />
    </>
  );
}