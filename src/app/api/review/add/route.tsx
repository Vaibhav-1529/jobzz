import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { content, userId, companyId } = body;

    if (!content || !userId || !companyId) {
      return NextResponse.json(
        { success: false, message: "Enter a valid data" },
        { status: 400 }
      );
    }
    const review = await prismaclient.review.create({
      data: body,
      include:{
        user:true
      }
    });

    if (!review) {
      return NextResponse.json({
        success: false,
        message: "Something went wrong",
      });
    }
    const response = NextResponse.json({
      success: true,
      data:review,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
}
