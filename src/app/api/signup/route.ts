import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, role } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Enter a valid data" },
        { status: 400 }
      );
    }
    const check = await prismaclient.user.findFirst({
      where: {
        email,
      },
    });
    if (check)
      return NextResponse.json({
        success: false,
        message: "User already exist",
      });
    const user = await prismaclient.user.create({
      data: {
        email: email,
        password: password,
        role: role,
        name: name,
      },
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Something went wrong",
      });
    }
    const response = NextResponse.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email },
    });

    response.cookies.set("token", user.id);
    return response;
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
}
