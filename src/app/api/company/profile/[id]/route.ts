// /api/company/profile/[id]/route.ts
import { Checkcookie } from "@/HelperFun/Checkcookie";
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: any }
) {
  const user = await Checkcookie();
  if (!user) {
    return NextResponse.json({
      success: false,
      message: "Not a valid user",
    });
  }
  const id=await params.id;
  try {
    const company = await prismaclient.company.findUnique({
      where: {
        id: id,
      },
      include: {
        jobs: true,
        review: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!company) {
      return NextResponse.json({
        success: false,
        message: "Company not found",
      });
    }

    return NextResponse.json({
      success: true,
      data: company,
    });
  } catch (error) {
    console.error("Fetch company error:", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
