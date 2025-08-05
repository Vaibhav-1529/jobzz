import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  let TotalUser: any[] = [];
  const existingToken = req.cookies.get("token")?.value || "";

  try {
    const TokenKey = process.env.SECRET;
    if (!TokenKey) {
      throw new Error("JWT Secret is not defined in env");
    }

    if (existingToken) {
      const data = JSON.parse(existingToken); // This will be an object
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          try {
            const decoded: any = jwt.verify(data[key], TokenKey);
            console.log(decoded)
            const user = await prismaclient.user.findUnique({
              where: { id: decoded.id },
              omit:{
                password:true
              }
            });

            if (user) {
              TotalUser.push(user);
            }
          } catch (err) {
            console.error(`Token for ${key} is invalid:`, err);
            continue;
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      users: TotalUser,
    });
  } catch (error: any) {
    console.error("Error in GET /api", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
}
