import { NextResponse } from "next/server";

import { db } from "@/db";

export async function GET(
  req: Request,
  { params }: { params: { modelId: string } }
) {
  try {
    if (!params.modelId) {
      return new NextResponse("Model id is required", { status: 400 });
    }

    const model = await db.phoneModel.findUnique({
      where: {
        id: params.modelId,
      },
    });

    return NextResponse.json(model);
  } catch (error) {
    console.log("[MODEL_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { modelId: string } }
) {
  try {
    if (!params.modelId) {
      return new NextResponse("Model id is required", { status: 400 });
    }

    const model = await db.phoneModel.delete({
      where: {
        id: params.modelId,
      },
    });

    return NextResponse.json(model);
  } catch (error) {
    console.log("[MODEL_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { modelId: string } }
) {
  try {
    const body = await req.json();

    const { name, imageId } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!imageId) {
      return new NextResponse("Image URL is required", { status: 400 });
    }

    if (!params.modelId) {
      return new NextResponse("Model id is required", { status: 400 });
    }

    const model = await db.phoneModel.update({
      where: {
        id: params.modelId,
      },
      data: {
        name,
        imageId,
      },
    });

    return NextResponse.json(model);
  } catch (error) {
    console.log("[MODEL_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
