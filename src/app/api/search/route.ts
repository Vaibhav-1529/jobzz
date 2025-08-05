import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchparams = req.nextUrl.searchParams;
  const q = searchparams.get("q");
  const et = encodeURIComponent(searchparams.get("et")||"");

  if (!q) {
    return NextResponse.json({
      success: false,
      data: [],
      message: "Enter a valid query",
    });
  }

  let whereClause = {};

  if (et) {
    whereClause = {
      AND: [
        {
          title: {
            contains: q,
            mode: "insensitive",
          },
        },
        {
          employment_type: et,
        },
      ],
    };
  } else {
    whereClause = {
      title: {
        contains: q,
        mode: "insensitive",
      },
    };
  }

  const res = await prismaclient.job.findMany({
    where: whereClause,
  });
  return NextResponse.json({
    success: true,
    data: res,
    message: "Search completed",
  });
}
