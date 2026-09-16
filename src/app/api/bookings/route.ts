import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendBookingNotification } from "@/lib/mailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, mobile, message, packageId } = body;

    if (!name || !email || !mobile) {
      return NextResponse.json({ error: "Zaroori fields missing hain" }, { status: 400 });
    }

    const packageData = packageId
      ? await prisma.package.findUnique({ where: { id: packageId } })
      : null;

    const booking = await prisma.booking.create({
      data: {
        name,
        email,
        mobile,
        message,
        packageId: packageId || null,
      },
    });

    try {
      await sendBookingNotification({
        name,
        email,
        mobile,
        message,
        packageTitle: packageData?.title ?? null,
      });
    } catch (mailError) {
      console.error("Email bhejne me error (booking phir bhi save ho gayi):", mailError);
    }

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Booking save nahi ho payi" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: { package: { select: { title: true, category: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(bookings);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}