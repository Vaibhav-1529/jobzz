"use client";

import { Button, DropdownMenu } from "@radix-ui/themes";
import { EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CompJobCardDropD({ job }: { job: any }) {
  const router = useRouter();

  async function handleDelete() {
    const res = await fetch("/api/company/jobs/delete", {
      method: "POST",
      body: JSON.stringify({ job }), 
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (data.success) {
      router.refresh();
    } else {
      alert(data.message || "Deletion failed");
    }
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <EllipsisVertical className="cursor-pointer" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item color="red" onClick={handleDelete}>
          Delete
        </DropdownMenu.Item>
        <DropdownMenu.Item>Edit</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
