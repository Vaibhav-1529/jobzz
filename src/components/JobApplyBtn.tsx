"use client"
import { Button, ThickChevronRightIcon } from "@radix-ui/themes";
import { useState } from "react";
import BtnLoading from "./lodingstate/BtnLoading";

export default function JobApplyBtn({
  job,
  setIsApplied,
}: {
  job: any;
  isApplied: boolean;
  setIsApplied: (value: boolean) => void;
}) {
  const[isloading,setIsloading]=useState<boolean>(false)
  async function handleSubmit() {
    setIsloading(true)
    try {
      const res = await fetch("/api/job/apply/" + job?.id);
      const data = await res.json();
      if (data.success) {
        alert("Applied Successfully.");
        setIsApplied(true);
      } else {
        if ((data.message = "The user already applied for this job"))
          setIsApplied(true);
      }
    } catch (error) {
    }
    finally{
      setIsloading(false)
    }
  }
  return (
    <Button
      className="flex justify-center items-center border-2"
      color="green"
      size={"3"}
      onClick={handleSubmit}
    >{
      isloading?<BtnLoading/>:<div className="flex gap-3 items-center ">Apply<ThickChevronRightIcon /></div>
    }
      
    </Button>
  );
}
