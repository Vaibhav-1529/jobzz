// @ts-nocheck
'use client';
import JobCard from "@/components/cards/job-card";
import CardLoading from "@/components/lodingstate/CardLoading";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../layout";
import Loading from "@/components/lodingstate/Loading";

export default function SearchPage() {
  const searchparams = useSearchParams();
  const {user}=useContext(UserContext)
  const q = searchparams.get("q") || "";
  const et = searchparams.get("et") || "";
  const jt=searchparams.get("jt")||"";
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  if(!user) return <Loading/>;
  useEffect(() => {
    async function fetchJobs() {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/search?q=${q}&et=${et}&jt=${jt}`);
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
  }, [q, et,jt]);

  return (
    <main className="max-w-7xl m-auto h-screen">
  <div className="h-full overflow-y-auto py-5 px-4 scrollbar-hidden pb-20">
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
