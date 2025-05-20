import { promises as fs } from "fs";
import { NextResponse } from "next/server";

const filePath = process.env.NODE_ENV === "production" ? "/tmp/jobs.json" : process.cwd() + "/src/app/api/jobs/jobs.json";

//  GET Endpoint - Fetch Jobs
export async function GET() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error("Error reading jobs.json:", error);
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}

// POST Endpoint - Add Job
export async function POST(request: Request) {
  try {
    const newJob = await request.json();

    console.log("Received new job:", newJob);

    // Ensure the Job structure
    const formattedJob = {
      id: String(new Date().getTime()), // Unique ID based on timestamp
      title: newJob.title,
      company: {
        id: String(new Date().getTime()), // Assign company ID dynamically
        name: newJob.company,
        logo: newJob.logo || "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", // Default logo
      },
      location: newJob.location,
      description: {
        description: newJob.description,
        aboutTheCompany: "Company information will be updated soon.",
        aboutTheRole: "Role details will be refined.",
        aboutTheTeam: "Team description will be added.",
        responsibilities: newJob.responsibilities || [],
        requirements: newJob.requirements || [],
        benefits: newJob.benefits || [],
        role: newJob.title,
        industry: "Technology",
        employmentType: newJob.employmentType,
        education: newJob.education || [],
      },
      datePosted: new Date().toISOString(),
      experience: newJob.experience || { min: 0, max: 0 },
      salary: newJob.salary || { min: 0, max: 0 },
      skills: newJob.skills || [],
      postedBy: "admin@example.com",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      isActive: true,
      isDeleted: false,
    };

    // Save to `jobs.json`
    const data = await fs.readFile(filePath, "utf-8");
    const jobs = JSON.parse(data);

    jobs.push(formattedJob);
    await fs.writeFile(filePath, JSON.stringify(jobs, null, 2), "utf-8");

    console.log("Job added successfully!");

    return NextResponse.json({ message: "Job added successfully!" });
  } catch (error) {
    console.error("Error adding job:", error);
    return NextResponse.json({ error: "Failed to add job" }, { status: 500 });
  }
}
