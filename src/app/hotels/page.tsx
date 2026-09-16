import { prisma } from "@/lib/prisma";
import ListingHero from "@/components/listing/ListingHero";
import ListingsGrid from "@/components/hotels/HotelsGrid";

export default async function HotelsPage() {
  const listings = await prisma.listing.findMany({
    where: { category: { equals: "hotel", mode: "insensitive" } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>

      <ListingHero
        title="Handpicked stays designed to make every journey memorable."
        image="/images/hotel-hero.jpg"
        searchOptions={[
          { value: "kashmir", label: "Kashmir, India" },
          { value: "kerala", label: "Kerala, India" },
        ]}
        buttonText="Search"
      />
      <ListingsGrid listings={listings} />
    </>
  );
}