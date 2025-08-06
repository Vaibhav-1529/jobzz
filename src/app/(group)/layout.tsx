// @ts-nocheck
"use client";

import Header from "@/components/headers/header";
import { createContext, use, useContext, useEffect, useState } from "react";
import { user } from "../../../generated/prisma";
import HeaderWrapper from "@/components/headers/headerWrapper";



export const UserContext = createContext({
  user: user,
  setUser: (value: user|null) => {},
  company: null,
  setCompany: (value: null) => {},
  isguest: false,
  setIsguest: (value: boolean) => {},
});

export default function UserProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState(null);
  const [isguest, setIsguest] = useState(false);
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
useEffect(() => {
  async function checkGuest() {
    try {
      const res = await fetch("/api/guest");
      const data = await res.json();
      if (data.success) {
        setIsguest(true);
      } else {
        setIsguest(false);
      }
    } catch (err) {
      console.error("Guest check failed", err);
      setIsguest(false);
    }
  }

  checkGuest();
}, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, company, setCompany, isguest, setIsguest }}
    >
      <HeaderWrapper />
      {children}
    </UserContext.Provider>
  );
}
