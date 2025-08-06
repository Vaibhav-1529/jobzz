import JobCard from "@/components/cards/job-card";
import prismaclient from "@/services/prisma";
type Job = {
  id: string;
  title: string;
  description: string;
  location: string;
  salary: number;
  category: string;
  employment_type: string;
  job_type: string;
  apply_through: string;
};

export default async function page() {
  const res=await prismaclient.job.findMany({
    include:{
      company:true
    }
  });
  const jobs=res;
// console.log(jobs);
  return (
    <main>
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        {jobs.map((job) => (
          <JobCard fromSearch={true} key={job.id} job={job} />
        ))}
      </div>
    </main>
  );
}
