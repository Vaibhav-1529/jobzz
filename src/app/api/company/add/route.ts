import { Checkcookie } from "@/HelperFun/Checkcookie";
import prismaclient from "@/services/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(res: NextRequest) {
  const body =await res.json();
  const user = await Checkcookie();
  if (!user)
    return NextResponse.json({
      sucess: false,
      message: "Unauthorized access",
    });
    body.ownerId=user.id;
    try{
        const company=await prismaclient.company.create({
            data:body
        })
        return NextResponse.json({
            success:true,
            message:"Company creates Successfully",
            res:company,
        })
    }
    catch(err){
        return NextResponse.json({
            success:false,
            message:"Something went wrong"
        })
    }
}
