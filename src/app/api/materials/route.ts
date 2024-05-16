import { NextResponse } from "next/server";

import { db } from "@/db";

export async function POST(
  req: Request,
  { params }: { params: { materialId: string } }
) {
  try {
    const body = await req.json();

    const { name, basePrice, description } = body;

    if (!name) {
      return new NextResponse("Nombre es requerido", { status: 400 });
    }

    if (!basePrice) {
      return new NextResponse("Precio es requerido", { status: 400 });
    }

    const material = await db.caseMaterial.create({
      data: {
        name,
        basePrice,
        description,
      },
    });

    return NextResponse.json(material);
  } catch (error) {
    console.log("[MATERIAL_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { materialId: string } }
) {
  try {
    const materials = await db.caseMaterial.findMany({
      where: {
        id: params.materialId,
      },
    });

    return NextResponse.json(materials);
  } catch (error) {
    console.log("[MATERIAL_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
