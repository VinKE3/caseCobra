import { NextResponse } from "next/server";

import { db } from "@/db";

export async function GET(
  req: Request,
  { params }: { params: { finishId: string } }
) {
  try {
    if (!params.finishId) {
      return new NextResponse("Finish id is required", { status: 400 });
    }

    const finish = await db.caseFinish.findUnique({
      where: {
        id: params.finishId,
      },
    });

    return NextResponse.json(finish);
  } catch (error) {
    console.log("[FINISH_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { finishId: string } }
) {
  try {
    if (!params.finishId) {
      return new NextResponse("Finish id is required", { status: 400 });
    }

    const finish = await db.caseFinish.delete({
      where: {
        id: params.finishId,
      },
    });

    return NextResponse.json(finish);
  } catch (error) {
    console.log("[FINISH_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { finishId: string } }
) {
  try {
    const body = await req.json();

    const { name, basePrice } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!basePrice) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!params.finishId) {
      return new NextResponse("Finish id is required", { status: 400 });
    }

    const finish = await db.caseFinish.update({
      where: {
        id: params.finishId,
      },
      data: {
        name,
        basePrice,
      },
    });

    return NextResponse.json(finish);
  } catch (error) {
    console.log("[FINISH_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
