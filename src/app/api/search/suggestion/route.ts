import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchparams = req.nextUrl.searchParams;
  const q = searchparams.get("q");
  if (!q) {
    return NextResponse.json({
      success: false,
      data: [],
      message: "Enter a valid query",
    });
  }

   const res = await prismaclient.job.findMany({
    where: {
      title:{
        contains:q,
        mode:"insensitive"
      }
    },
    select:{
      id:true,
      title:true,
    },
    take:10
  });

  return NextResponse.json({
    success: true,
    data: res,
    message: "Search completed",
  });
}
