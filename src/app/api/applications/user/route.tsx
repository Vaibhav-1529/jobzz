import { Checkcookie } from "@/HelperFun/Checkcookie";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const ExistingUser = await Checkcookie();
  if (!ExistingUser)
    return NextResponse.json({
      success: false,
      message: "The user is not valid",
    });
  try {
    const res = await prismaClient.applications.findMany({
      where: {
        user_id: ExistingUser?.id,
      },
      include: {
        jobs: true,
      },
    });
    return NextResponse.json({
      success: true,
      data: res,
    });
  } catch (error: any) {
    console.log(error?.message);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
