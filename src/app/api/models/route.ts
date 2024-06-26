import { NextResponse } from "next/server";

import { db } from "@/db";

export async function POST(
  req: Request,
  { params }: { params: { modelId: string } }
) {
  try {
    const body = await req.json();

    const { name, imageId, basePrice } = body;

    if (!name) {
      return new NextResponse("Nombre es requerido", { status: 400 });
    }

    if (!basePrice) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!imageId) {
      return new NextResponse("Image Id is required", { status: 400 });
    }

    const model = await db.phoneModel.create({
      data: {
        name,
        imageId,
        basePrice,
      },
    });

    return NextResponse.json(model);
  } catch (error) {
    console.log("[MODEL_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { modelId: string } }
) {
  try {
    const models = await db.phoneModel.findMany({
      where: {
        id: params.modelId,
      },
    });

    return NextResponse.json(models);
  } catch (error) {
    console.log("[MODEL_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
