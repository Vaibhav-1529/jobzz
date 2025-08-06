"use client";

export default function Page() {
  async function handleClick() {
    const res = await fetch("/api/seed", {
      method: "POST",
    });
    const data = await res.json();
    // console.log(data);
  }

  return (
    <div>
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Seed Local Data
      </button>
    </div>
  );
}