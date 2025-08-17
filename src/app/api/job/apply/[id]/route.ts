import { Checkcookie } from "@/HelperFun/Checkcookie";
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(res: NextRequest, { params }:{
    params:{
        id:string
    }
}) {
  const user = await Checkcookie();
  const {id} =await params;
  if (!user) {
    return NextResponse.json({
      success: false,
      message: "Nat a valid user",
    });
  }
  const appToSave = {
    user_id: user?.id,
    job_id: id,
  };
  const check= await prismaclient.applications.findFirst({
      where: {
        user_id:user?.id,
        job_id:id,
      },
    });
    if(check){
        return NextResponse.json({
            success:false,
            message:"The user already applied for this job",
        })
    }
  try {
    const application = await prismaclient.applications.create({
      data: appToSave,
    });
    console.log("add",application)
    return NextResponse.json({
        success:true,
        data:application,
    })
  } catch (error) {
        return NextResponse.json({
        success:true,
        message:"Something went wrong"
    })
  }
}
