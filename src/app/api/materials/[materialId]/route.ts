import { NextResponse } from "next/server";

import { db } from "@/db";

export async function GET(
  req: Request,
  { params }: { params: { materialId: string } }
) {
  try {
    if (!params.materialId) {
      return new NextResponse("Material id is required", { status: 400 });
    }

    const material = await db.caseMaterial.findUnique({
      where: {
        id: params.materialId,
      },
    });

    return NextResponse.json(material);
  } catch (error) {
    console.log("[MATERIAL_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { materialId: string } }
) {
  try {
    if (!params.materialId) {
      return new NextResponse("Material id is required", { status: 400 });
    }

    const material = await db.caseMaterial.delete({
      where: {
        id: params.materialId,
      },
    });

    return NextResponse.json(material);
  } catch (error) {
    console.log("[MATERIAL_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { materialId: string } }
) {
  try {
    const body = await req.json();

    const { name, basePrice, description } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!basePrice) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!params.materialId) {
      return new NextResponse("Material id is required", { status: 400 });
    }

    const material = await db.caseMaterial.update({
      where: {
        id: params.materialId,
      },
      data: {
        name,
        basePrice,
        description,
      },
    });

    return NextResponse.json(material);
  } catch (error) {
    console.log("[MATERIAL_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
