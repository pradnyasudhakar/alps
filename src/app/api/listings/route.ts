import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const listings = await prisma.listing.findMany({
      where: category ? { category: { equals: category, mode: "insensitive" } } : undefined,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(listings);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const listing = await prisma.listing.create({
      data: {
        title: body.title,
        location: body.location,
        pricePerNight: Number(body.pricePerNight),
        category: body.category,
        description: body.description,
        images: body.images,
        rating: Number(body.rating) || 5,
      },
    });
    return NextResponse.json(listing, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}