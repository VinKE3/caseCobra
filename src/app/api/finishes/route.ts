import { NextResponse } from "next/server";

import { db } from "@/db";

export async function POST(
  req: Request,
  { params }: { params: { finishId: string } }
) {
  try {
    const body = await req.json();

    const { name, basePrice } = body;

    if (!name) {
      return new NextResponse("Nombre es requerido", { status: 400 });
    }

    if (!basePrice) {
      return new NextResponse("Price is required", { status: 400 });
    }

    const finish = await db.caseFinish.create({
      data: {
        name,
        basePrice,
      },
    });

    return NextResponse.json(finish);
  } catch (error) {
    console.log("[FINISH_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { finishId: string } }
) {
  try {
    const finishes = await db.caseFinish.findMany({
      where: {
        id: params.finishId,
      },
    });

    return NextResponse.json(finishes);
  } catch (error) {
    console.log("[FINISH_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
