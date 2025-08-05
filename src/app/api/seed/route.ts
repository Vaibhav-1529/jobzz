// app/api/seed/route.ts
import { NextResponse } from "next/server";
import prismaclient from "@/services/prisma";
import { jobs } from "@/data";

export async function POST() {
  const jobdata = jobs.data;
    const et=["Full-Time","Part-Time","Contract"]
    const jt=["Remote","On-site","Hybrid"]
    const at=["Gloogle","LinkedIn"]
  if (!Array.isArray(jobdata)) {
    return NextResponse.json({ success: false, message: "Invalid job data" });
  }

  for (const item of jobdata) {
    await prismaclient.job.create({
      data: {
        title: item.job_title,
        description: item.job_description,
        location: item.job_location,
        salary: Math.floor(Math.random()*100000),
        employment_type:et[Math.floor(Math.random()*et.length)],
        job_type: jt[Math.floor(Math.random()*jt.length)],
        apply_through: at[Math.floor(Math.random()*at.length)],
        companyId:"688e56e0572417f61a461056"
      },
    });
  }
  
  return NextResponse.json({ success: true, message: "Seeded successfully" });
}