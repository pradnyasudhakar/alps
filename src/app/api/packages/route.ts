import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const packages = await prisma.package.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(packages);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newPackage = await prisma.package.create({
  data: {
    title: body.title,
    route: body.route,
    duration: body.duration,
    tourType: body.tourType,
    category: body.category,   
    price: Number(body.price),
    image: body.image,
    icons: body.icons,
  },
});
    return NextResponse.json(newPackage, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}