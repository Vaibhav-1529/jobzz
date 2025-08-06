import { cookies } from "next/headers";

export async function GET() {
  const cookieStore =await cookies();

  cookieStore.set("guest_user", "true", {
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day in seconds
    httpOnly: false,      // make true if only server needs access
    sameSite: "strict",
  });

  return Response.json({ success: true });
}
