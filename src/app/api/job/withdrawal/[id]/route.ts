import { Checkcookie } from "@/HelperFun/Checkcookie";
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(res: NextRequest, { params }: { params: any }) {
  const user = await Checkcookie();
  const { id } = params;

  if (!user) {
    return NextResponse.json({
      success: false,
      message: "Not a valid user",
    });
  }

  const application = await prismaclient.applications.findFirst({
    where: {
      user_id: user.id,
      job_id: id,
    },
  });

  if (!application?.id) {
    return NextResponse.json({
      success: false,
      message: "Application not found or already withdrawn",
    });
  }

  try {
    const applicationdata = await prismaclient.applications.delete({
      where: {
        id: application.id,
      },
    });
    return NextResponse.json({
      success: true,
      data: applicationdata,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}

