"use client";
import { Button, Card, RadioGroup, Text } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FilterSidebar() {
  const searchparams=useSearchParams();
  const q=searchparams.get("q");
  const [jobType, setJobType] = useState("1");
  const [employmentType, setEmploymentType] = useState("");
  const router=useRouter();
  function handleclick(){
    router.push(`/search?q=${q}&ct=${employmentType}`)
  }
  return (
    <div className="py-10 min-w-64">
      <div className="flex flex-col gap-6">
        <Card>
          <Text className="font-semibold">Job Type:</Text>
          <RadioGroup.Root
            value={jobType}
            onValueChange={(val) => setJobType(val)}
            name="example"
          >
            <RadioGroup.Item value="1">Remote</RadioGroup.Item>
            <RadioGroup.Item value="2">On-site</RadioGroup.Item>
            <RadioGroup.Item value="3">Hybrid</RadioGroup.Item>
          </RadioGroup.Root>
        </Card>
        <Card>
          <Text className="font-semibold">Employment Type:</Text>
          <RadioGroup.Root
            value={employmentType}
            onValueChange={(val) => setEmploymentType(val)}
            name="example"
          >
            <RadioGroup.Item value="Full Time">Full-Time</RadioGroup.Item>
            <RadioGroup.Item value="Part Time">Part-Time</RadioGroup.Item>
            <RadioGroup.Item value="Contract">Contract</RadioGroup.Item>
          </RadioGroup.Root>
        </Card>
          <Button onClick={handleclick}>
              Add filter
          </Button>
      </div>
    </div>
  );
}
