"use client";
import { Box, TextField } from "@radix-ui/themes";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SearchInput() {
  const [input, setInput] = useState("");
  const [suggestion, setSuggestion] = useState<{ title: string }[]>([]);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && input.trim()) {
      router.push(`/search?q=${encodeURIComponent(input.trim())}`);
      setSuggestion([]);
    }
  }

  // Fetch suggestions
  useEffect(() => {
    async function getsuggestion() {
      const res = await fetch(`/api/search/suggestion?q=${input}`);
      const data = await res.json();
      if (data.success) {
        setSuggestion(data.data);
      } else {
        setSuggestion([]);
      }
    }

    if (input.trim()) {
      getsuggestion();
    } else {
      setSuggestion([]);
    }
  }, [input]);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setSuggestion([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Box
      ref={wrapperRef}
      className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto"
    >
      <TextField.Root
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        size="2"
        placeholder="Search jobs..."
        className="w-full"
      >
        <TextField.Slot>
          <Search className="h-5 w-5" />
        </TextField.Slot>
      </TextField.Root>

      {input.trim() && suggestion.length > 0 && (
        <Box className="absolute left-0 right-0 mt-2 z-50 bg-white border border-gray-200 rounded-md shadow-lg">
          {suggestion.map((item, index) => (
            <p
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm sm:text-base text-black"
            >
              {item.title}
            </p>
          ))}
        </Box>
      )}
    </Box>
  );
}
