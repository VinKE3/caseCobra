import { NextResponse } from "next/server";

import { db } from "@/db";

export async function POST(
  req: Request,
  { params }: { params: { colorId: string } }
) {
  try {
    const body = await req.json();

    const { name, value } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
    }

    const color = await db.phoneColor.create({
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLORS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { colorId: string } }
) {
  try {
    const colors = await db.phoneColor.findMany({
      where: {
        id: params.colorId,
      },
    });

    return NextResponse.json(colors);
  } catch (error) {
    console.log("[COLORS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
