"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Job = {
  id: string;
  title: string;
  location: string;
  company: {
    name: string;
    logo: string;
  };
  description: {
    description: string;
    responsibilities: string[];
    requirements: string[];
    benefits: string[];
  };
};

export default function JobDetail({ params }: { params: { id: string } }) {
  const [job, setJob] = useState<Job | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchJob = async () => {
      const response = await fetch(`/api/jobs`);
      const jobs = await response.json();
      const selectedJob = jobs.find((j: any) => j.id === params.id);

      if (selectedJob) {
        setJob(selectedJob);
      } else {
        router.push("/jobs");
      }
    };

    fetchJob();
  }, [params.id, router]);

  if (!job) return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{job.title}</h1>
          <p className="text-gray-600">{job.company.name}</p>
        </div>
        <Image src={job.company.logo} alt={job.company.name} width={80} height={80} className="rounded-full object-contain" />
      </div>
      
      <p className="text-gray-500 mt-4">{job.location}</p>
      <p className="mt-2">{job.description.description}</p>

      <h2 className="text-lg font-semibold mt-4">Responsibilities</h2>
      <ul className="list-disc pl-5 text-gray-600">
        {job.description.responsibilities.map((resp: string, idx: number) => (
          <li key={idx}>{resp}</li>
        ))}
      </ul>

      <h2 className="text-lg font-semibold mt-4">Requirements</h2>
      <ul className="list-disc pl-5 text-gray-600">
        {job.description.requirements.map((req: string, idx: number) => (
          <li key={idx}>{req}</li>
        ))}
      </ul>

      <h2 className="text-lg font-semibold mt-4">Benefits</h2>
      <ul className="list-disc pl-5 text-gray-600">
        {job.description.benefits.map((benefit: string, idx: number) => (
          <li key={idx}>{benefit}</li>
        ))}
      </ul>

      <button
        onClick={() => alert("Application submitted!")}
        className="block w-full mt-6 bg-blue-500 text-white px-4 py-3 rounded-md hover:bg-blue-600 text-center"
      >
        Apply Now
      </button>
    </div>
  );
}
