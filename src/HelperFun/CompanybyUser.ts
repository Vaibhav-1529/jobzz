import prismaclient from "@/services/prisma";
import { cookies } from "next/headers";

export  async function CompanybyUser(userId:string) {
    const userCookies=await cookies();
    const token=userCookies.get("token")?.value;
    if(!token){
       return null;
    }
    const company=await prismaclient.company.findUnique({
        where:{
            ownerId:userId
        },
    })     
    if(!company)return null
    else return company;
}