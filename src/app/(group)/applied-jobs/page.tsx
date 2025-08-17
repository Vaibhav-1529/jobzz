'use client'
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../layout"
import { Box, Flex, Heading } from "@radix-ui/themes"
import UserEndComJob from "@/components/cards/UserEndComJob";
import { Applications, job } from "../../../../generated/prisma";
type ApplicationWithJob = Applications & {
  jobs: job;
};

export default function page() {
    const {user}=useContext(UserContext);
    const [UserApplicantions,setUserApplications]=useState<ApplicationWithJob[]>([])
    useEffect(()=>{
        async function fetchapplications() {
            const response=await fetch("/api/applications/user");
            const data=await response.json()
            if(data?.success){
                // console.log(data)
                setUserApplications(data.data);
            }
        }
        fetchapplications();
    },[user])
    if(user){
        return(
            
            <Box className="max-w-6xl m-auto">
                <Heading my={"5"}>Applications of user</Heading>
                <Flex direction={"column"} justify={"start"} align={"center"} gap={"6"}>

                {
                    UserApplicantions.map((applicantion)=>{
                        return (
                            <UserEndComJob key={applicantion?.id} job={applicantion?.jobs}/>
                        )
                    })
                }
                </Flex>
            </Box>
        )
    }
    else
  return (
    <div>
        Not a valid user
    </div>
  )
}
