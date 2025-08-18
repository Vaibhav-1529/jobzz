import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;   

  console.log("Fetching applicants for job ID:", id);

  try {
    const res = await prismaClient.applications.findMany({
      where: { job_id: id },
      select: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    const usersOnly = res.map((app) => app.user);

    return NextResponse.json({
      success: true,
      data: usersOnly,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
