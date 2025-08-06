"use client";
import { Button, ThickChevronRightIcon } from "@radix-ui/themes";

export default function JobApplyBtn({ job }:{job:any}) {
  async function handleSubmit() {
    try {
      const res = await fetch("/api/job/apply/" + job?.id);
      const data = await res.json();
      if (data.success) {
        alert("Applied Successfully.");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
        // console.log(error);
    }
  }
  return (
    <Button
              style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }} color="green" onClick={handleSubmit}>
      Apply
                <ThickChevronRightIcon />

    </Button>
  );
}