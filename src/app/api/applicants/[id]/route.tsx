import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: {
  params:any
}) {
  const { id } =await params;

  try {
const res = await prismaClient.applications.findMany({
  where: { job_id: id },
  select: {
    user: {
      select: {
        id: true,
        name: true,
        email: true,
      },
    },
  },
});

    const usersOnly = res.map(app => app.user); 

    return NextResponse.json({
      success: true,
      data: usersOnly,
    });
  } catch (error: any) {
    console.log(error?.message);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    }, { status: 500 });
  }
}
