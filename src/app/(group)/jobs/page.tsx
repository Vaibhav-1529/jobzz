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
    <main className="max-w-7xl m-auto px-3 py-5">
    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard fromSearch={true} key={job.id} job={job} />
        ))}
      </div>
    </main>
  );
}
