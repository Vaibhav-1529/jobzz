import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest,{params}:{params:any}) {
  try {
    const id = params.id
    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID is missing",
        },
        { status: 400 }
      );
    }

    const user = await prismaclient.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const { password, ...userData } = user;

    const TokenKey = process.env.SECRET;
    if (!TokenKey) {
      throw new Error("JWT Secret Key is not defined in .env");
    }

    const token = jwt.sign({ id: user.id }, TokenKey, { expiresIn: "1d" });

    const res = NextResponse.json({
      success: true,
      user: userData,
    });

    res.cookies.set("Active_User", token);

    return res;
  } catch (error: any) {
    console.error("Error in GET /api/switch/[id]:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
