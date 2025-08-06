"use client";

import * as Form from "@radix-ui/react-form";
import { useContext, useState } from "react";
import { UserContext } from "../layout";

export default function SimpleAddJobForm() {
  const employmentTypes = ["Full-Time", "Part-Time", "Contract"];
  const jobTypes = ["Remote", "On-site", "Hybrid"];
  const applyThroughOptions = ["Google", "LinkedIn"];

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    employment_type: "",
    job_type: "",
    apply_through: "",
  });

  const { company } = useContext(UserContext);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!company || !company?.id) {
      alert("Company not found. Please log in again.");
      return;
    }

    const payload = {
      ...formData,
      salary: Number(formData.salary),
      companyId: company?.id,
    };

    try {
      const res = await fetch("http://localhost:3000/api/job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to submit");

      alert("Job submitted successfully!");
    } catch (err) {
      console.error("Job Submit Error:", err);
      alert("Error submitting job");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 rounded-xl shadow-md bg-background text-foreground border border-border">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Post a New Job
      </h1>

      <Form.Root onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: "title", label: "Job Title", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "location", label: "Location", type: "text" },
          { name: "salary", label: "Salary", type: "number" },
        ].map(({ name, label, type }) => (
          <Form.Field name={name} key={name} className="grid gap-1">
            <Form.Label className="font-medium">{label}</Form.Label>
            <Form.Control asChild>
              {type === "textarea" ? (
                <textarea
                  name={name}
                  value={formData[name as keyof typeof formData]}
                  onChange={handleChange}
                  required
                  className="p-2 border border-border bg-background text-foreground rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <input
                  type={type}
                  name={name}
                  value={formData[name as keyof typeof formData]}
                  onChange={handleChange}
                  required
                  className="p-2 border border-border bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </Form.Control>
          </Form.Field>
        ))}

        {/* Employment Type */}
        <Form.Field name="employment_type" className="grid gap-1">
          <Form.Label className="font-medium">Employment Type</Form.Label>
          <select
            name="employment_type"
            value={formData.employment_type}
            onChange={handleChange}
            required
            className="p-2 border border-border bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select type...
            </option>
            {employmentTypes.map((type) => (
              <option value={type} key={type}>
                {type}
              </option>
            ))}
          </select>
        </Form.Field>

        {/* Job Type */}
        <Form.Field name="job_type" className="grid gap-1">
          <Form.Label className="font-medium">Job Type</Form.Label>
          <select
            name="job_type"
            value={formData.job_type}
            onChange={handleChange}
            required
            className="p-2 border border-border bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select job type...
            </option>
            {jobTypes.map((type) => (
              <option value={type} key={type}>
                {type}
              </option>
            ))}
          </select>
        </Form.Field>

        {/* Apply Through */}
        <Form.Field name="apply_through" className="grid gap-1">
          <Form.Label className="font-medium">Apply Through</Form.Label>
          <select
            name="apply_through"
            value={formData.apply_through}
            onChange={handleChange}
            required
            className="p-2 border border-border bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Choose platform...
            </option>
            {applyThroughOptions.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </Form.Field>

        {/* Submit Button */}
        <Form.Submit asChild>
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-semibold"
          >
            Submit Job
          </button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
}
