import { prisma } from "@/lib/prisma";
import ListingForm from "../../ListingForm";
import { notFound } from "next/navigation";

export default async function EditListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = await prisma.listing.findUnique({ where: { id } });

  if (!listing) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl text-slate-900 mb-6">Edit Listing</h1>
      <ListingForm initialData={listing} />
    </div>
  );
}