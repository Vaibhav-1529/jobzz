import { NextRequest, NextResponse } from "next/server";
import prismaclient from "@/services/prisma";

export async function POST(req: NextRequest, { params }) {
  const id = params.id;
  try {
    const job = await prismaclient.job.findUnique({
      where: {
        id: id,
      },
    });
    if (job) return NextResponse.json({ success: true, data: job });
    else
      return NextResponse.json({
        success: false,
        data: {},
        message: "No Job Exist",
      });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
    );
  }
}
