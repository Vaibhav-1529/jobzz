import { NextRequest, NextResponse } from "next/server";
import prismaclient from "@/services/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing id" },
        { status: 400 }
      );
    }

    const reviews = await prismaclient.review.findMany({
      where: { 
        companyId:id
       },
      include: {
        user: true,
      },

    });

    return NextResponse.json({
      success: true,
      data: reviews,
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: "Failed to fetch reviews",
      error: err.message,
    });
  }
}
