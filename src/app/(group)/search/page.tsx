// @ts-nocheck
'use client';
import JobCard from "@/components/cards/job-card";
import CardLoading from "@/components/lodingstate/CardLoading";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const searchparams = useSearchParams();
  const q = searchparams.get("q") || "";
  const ct = searchparams.get("et") || "";

  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchJobs() {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/search?q=${q}&et=${ct}`);
        const data = await res.json();
        if (data.success) {
          setJobs(data.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchJobs();
  }, [q, ct]);

  return (
    <main className="max-w-7xl mx-auto h-screen">
  <div className="h-full overflow-y-auto py-10 px-4 scrollbar-hidden ">
    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {isLoading
        ? arr.map((item) => <CardLoading key={item} fromSearch />)
        : jobs.map((job) => (
            <JobCard fromSearch={true} key={job.id} job={job} />
          ))}
    </div>
  </div>
</main>

  );
}
