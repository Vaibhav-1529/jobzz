"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function DeleteAccfromSwitch(id: string) {
  const userCookie = await cookies();
  const existingToken = userCookie.get("token")?.value || "";
  const TokenKey = process.env.SECRET;

  if (!TokenKey) {
    throw new Error("JWT Secret Key is not defined in .env");
  }

  let userdata: Record<string, string> = {};

  if (existingToken) {
    try {
      userdata = JSON.parse(existingToken);
    } catch (e) {
      console.warn("Failed to parse existing token payload");
      return { success: false, message: "Invalid token format" };
    }
  }

  const filteredTokens: Record<string, string> = {};
  let i = 0;
  for (const [key, token] of Object.entries(userdata)) {
    try {
      const decoded: any = jwt.verify(token, TokenKey);
      if (decoded.id !== id) {
        const newKey = `User_${i}`;
        filteredTokens[newKey] = token;
        i++;
      }
    } catch {
      continue;
    }
  }
  userCookie.set("token", JSON.stringify(filteredTokens));
  const active = userCookie.get("Active_User")?.value;
  if (active) {
    try {
      const activeDecoded: any = jwt.verify(active, TokenKey);
      if (activeDecoded.id === id) {
        userCookie.delete("Active_User");

      }
    } catch {}
  }

  return {
    success: true,
    message: "Account deleted from switch list",
  };
}
