// @ts-nocheck
"use client";

import Header from "@/components/header";
import { createContext, use, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

export default function UserProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState(null);
  const [company, setCompany] = useState(null);
  
  useEffect(() => {
    async function getUser() {
      try {
        const res = await fetch("/api/current-user", {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          // console.log(data);
          setUser(data.user);
          // console.log(data.user)
          setCompany(data.company);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null);
      }
    }

    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser,company,setCompany }}>
      <Header/>
      {children}
    </UserContext.Provider>
  );
}
