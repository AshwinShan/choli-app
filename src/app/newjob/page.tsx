"use client";
import { useState } from "react";

export default function AddJob() {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    employmentType: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Job posted successfully!");
      setFormData({
        title: "",
        company: "",
        location: "",
        employmentType: "",
        description: "",
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } else {
      alert("Failed to post job.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Add a New Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
        <input
          type="text"
          name="employmentType"
          placeholder="Job Type (Full-time/Part-time)"
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
        <textarea
          name="description"
          placeholder="Job Description"
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
        >
          Submit Job
        </button>
      </form>
    </div>
  );
}
