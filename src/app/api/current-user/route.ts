import { NextRequest, NextResponse } from "next/server";
import { Checkcookie } from "@/HelperFun/Checkcookie";
import prismaclient from "@/services/prisma";

export async function GET(req: NextRequest) {
  const token=req.cookies.get("Active_User")?.value||""
  const user=await Checkcookie();
  if (!user) {
     const res=NextResponse.json({
        success: false,
        message:"The user is not exist",
    })
    res.cookies.delete("Active_User");
    return res;
  }
  else{
    const company=await prismaclient.company.findUnique({
      where:{
        ownerId:user.id
      }
    })
    const res=NextResponse.json({
        success: true,
        user,
        company
    })
    res.cookies.set("Active_User",token);
    return res;
  }
}
