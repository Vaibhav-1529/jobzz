"use client";
import { Box, TextField } from "@radix-ui/themes";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchInput() {
  const [input, setInput] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const router = useRouter();
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      router.push(`/search?q=${encodeURIComponent(input.trim())}`);
    }
  }
    useEffect(()=>{
      async function getsuggestion() {
        const res=await fetch(`http://localhost:3000/api/search/suggestion?q=${input}`);
        const data=await res.json();
        // console.log(data)
        if(data.success){
          setSuggestion(data.data);
        }
        else{
          setSuggestion([]);
        }
      }
      if(input.trim())
        getsuggestion();
  },[input])
  return (
    <Box className="w-full sm:w-auto flex-grow sm:flex-grow-0 relative">
      <TextField.Root
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        size="2"
        style={{width:"400px"}}
        placeholder="Search jobs..."
        className="w-full"
      >
        <TextField.Slot>
          <Search className="h-5 w-5" />
        </TextField.Slot>
      </TextField.Root>
      <Box className="absolute top-10 bottom-0">

      {Array.isArray(suggestion)&&
        suggestion.map((item,index)=>{
          return(
            <p key={index
            }
            className=" px-3 py-1 rounded-md text-black">
              {item?.title}
            </p>
          )
        })
      }
      </Box>
    </Box>
  );
}
