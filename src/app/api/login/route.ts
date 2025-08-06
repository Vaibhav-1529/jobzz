import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const existingToken = req.cookies.get("token")?.value || "";

  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: "Login details are not valid",
      });
    }

    const user = await prismaclient.user.findUnique({
      where: { email },
    });

    if (!user || user.password !== password) {
      return NextResponse.json({
        success: false,
        message: "User does not exist or credentials are wrong",
      });
    }

    const TokenKey = process.env.SECRET;
    if (!TokenKey) {
      throw new Error("JWT Secret Key is not defined in .env");
    }

    const newToken = jwt.sign({ id: user.id }, TokenKey, { expiresIn: "1d" });

    let usersTokenPayload: Record<string, string> = {};

    if (existingToken) {
      try {
        usersTokenPayload = JSON.parse(existingToken);
      } catch (e) {
        console.warn("Failed to parse existing token payload, resetting...");
      }
    }
    const userAlreadyExists = Object.values(usersTokenPayload).some((token) => {
      try {
        const decoded: any = jwt.verify(token, TokenKey);
        return decoded.id === user.id;
      } catch {
        return false;
      }
    });

    if (!userAlreadyExists) {
      const newKey = `User_${Object.keys(usersTokenPayload).length + 1}`;
      usersTokenPayload[newKey] = newToken;
    }

    const response = NextResponse.json({
      success: true,
      user:{
        id:user.id,
        name:user.name,
        email:user.email,
        role:user.role
      },
    });

    response.cookies.set("Active_User", newToken);
    response.cookies.set("token", JSON.stringify(usersTokenPayload));
    return response;
  } catch (error: any) {
    console.error("Login error:", error);
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
