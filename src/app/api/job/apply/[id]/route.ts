import { Checkcookie } from "@/HelperFun/Checkcookie";
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;   
  const user = await Checkcookie();

  if (!user) {
    return NextResponse.json({
      success: false,
      message: "Not a valid user",
    });
  }

  const appToSave = {
    user_id: user.id,
    job_id: id,
    resumeId:null,
  };

  const check = await prismaclient.applications.findFirst({
    where: {
      user_id: user.id,
      job_id: id,
    },
  });

  if (check) {
    return NextResponse.json({
      success: false,
      message: "The user already applied for this job",
    });
  }

  try {
    const application = await prismaclient.applications.create({
      data: appToSave,
    });
    return NextResponse.json({
      success: true,
      data: application,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
