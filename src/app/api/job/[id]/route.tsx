import { NextRequest, NextResponse } from "next/server";
import prismaclient from "@/services/prisma";

export async function GET(req: NextRequest, { params }: { params: any }) {
  const {id} = await params;
  try {
    const job = await prismaclient.job.findUnique({
      where: { id },
      include: { company: true },
    });

    if (job) {
      return NextResponse.json(job);
    } else {
      return new NextResponse("Job not found", { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
