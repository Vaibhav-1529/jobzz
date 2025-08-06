import prismaclient from "@/services/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function Checkcookie() {
  const userCookies =await cookies();
  const token = userCookies.get("Active_User")?.value ||"";
  // console.log("token",token)
  if (!token) {
    return null;
  }

  let currentuser: any={};
  const TokenKey = process.env.SECRET;
  
  try {
    if (!TokenKey) {
      throw new Error("JWT Secret is not defined");
    }
    currentuser = jwt.verify(token, TokenKey)||{};
  } catch (err) {
    // console.error("Invalid token", err);
    return null;
  }
  if(currentuser){
    // console.log("first",currentuser)
    const user = await prismaclient.user.findUnique({
      where: {
        id: currentuser.id,
      },
      omit:{
        password:true
      }
    });
    if (!user) return null;
    return user;
  }
}
