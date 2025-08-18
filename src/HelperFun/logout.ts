"use server"

import { cookies } from "next/headers"

export async function logout() {
    const userCookie=await cookies();
    userCookie.delete("Active_User")
}