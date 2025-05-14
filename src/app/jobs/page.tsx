"use client";
import { useState, useEffect, JSX } from "react";
import { Job } from "@/types/jobs";
import Image from "next/image";
import Filters from "@/components/jobs/filters";
import { Filter } from "@/types/filter";
import { Company } from "@/types/company";
import { useRouter } from "next/navigation";

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedFilters, setSelectedFilters] = useState({
    company: [] as string[],
    location: [] as string[],
    employmentType: [] as string[],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/jobs");
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        setError("Failed to load jobs.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filters: Filter = {
    company: Array.from(new Set(jobs.map((job) => job.company))),
    location: Array.from(new Set(jobs.map((job) => job.location))),
    employmentType: Array.from(
      new Set(jobs.map((job) => job.description.employmentType))
    ),
    map: function (
      arg0: (item: Company | string) => JSX.Element
    ): import("react").ReactNode {
      throw new Error("Function not implemented.");
    },
  };

  // Apply filters
  const filteredJobs = jobs.filter(
    (job) =>
      (selectedFilters.company.length === 0 ||
        selectedFilters.company.includes(job.company.name)) &&
      (selectedFilters.location.length === 0 ||
        selectedFilters.location.includes(job.location)) &&
      (selectedFilters.employmentType.length === 0 ||
        selectedFilters.employmentType.includes(job.description.employmentType))
  );
  const router = useRouter();
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Filters filter={filters} selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
      {loading && <p className="text-gray-500">Loading jobs...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-6xl p-5">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="p-5 rounded-xl shadow-md border border-slate-200 w-full max-w-sm mx-auto"
          >
            <div className="flex items-center justify-between">
              <div className="truncate w-3/4">
                <h2 className="text-xl font-bold overflow-hidden text-ellipsis whitespace-nowrap">
                  {job.title}
                </h2>
                <p className="text-gray-600 text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                  {job.company.name}
                </p>
              </div>
              <div className="w-1/4 flex justify-end">
                <Image
                  src={job.company.logo ?? "/placeholder-logo.png"}
                  alt={job.company.name}
                  width={50}
                  height={50}
                  className="rounded-full object-contain"
                />
              </div>
            </div>
            <p className="text-gray-500 text-sm overflow-hidden text-ellipsis whitespace-nowrap">
              {job.location}
            </p>
            <p className="text-gray-500 text-sm overflow-hidden text-ellipsis whitespace-nowrap">
              {job.description.industry}
            </p>
            <p className="text-gray-500 text-sm overflow-hidden text-ellipsis whitespace-nowrap">
              {job.description.employmentType}
            </p>
            <button
              onClick={() => router.push(`/jobs/${job.id}`)}
              className="text-xs bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer mt-2"
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}