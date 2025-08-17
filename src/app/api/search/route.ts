import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchparams = req.nextUrl.searchParams;
    const q = searchparams.get("q")?.trim() || ""; 
    const et = searchparams.get("et")?.trim() || ""; 
    const jt = searchparams.get("jt")?.trim() || "";
    // console.log(et)
    // console.log(jt)
    const whereClause: any = {
      AND: [],
    };

    if (q) {
      whereClause.AND.push({
        title: {
          contains: q,
          mode: "insensitive",
        },
      });
    }

    if (et) {
      whereClause.AND.push({
        employment_type: {
          equals: et,
        },
      });
    }

    if (jt) {
      whereClause.AND.push({
        job_type: {
          equals: jt,
        },
      });
    }

    if (whereClause.AND.length === 0) {
      delete whereClause.AND;
    }

    const jobs = await prismaclient.job.findMany({
      where: whereClause,
      include: {
        company: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: jobs,
      message: "Search completed",
    });
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong", error: String(error) },
      { status: 500 }
    );
  }
}
