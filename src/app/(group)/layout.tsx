// @ts-nocheck
"use client";

import Header from "@/components/headers/header";
import { createContext, use, useContext, useEffect, useState } from "react";
import { company, user } from "../../../generated/prisma";
import HeaderWrapper from "@/components/headers/headerWrapper";
import { useRouter } from "next/navigation";
import Loading from "@/components/lodingstate/Loading";
import Footer from "@/components/Footer";

type UserContextType = {
  user: User;
  setUser: (value: User) => void;
  company: Company;
  setCompany: (value: Company) => void;
  isguest: boolean;
  setIsguest: (value: boolean) => void;
  isuserLoading: boolean,
  setIsuserLoading: (value: boolean) => void,
};

export const UserContext = createContext<UserContextType>({
  user: user,
  setUser: (value: user|null) => {},
  company: company,
  setCompany: (value: company|null) => {},
  isguest: false,
  setIsguest: (value: boolean) => {},
  isuserLoading: false,
  setIsuserLoading: (value: boolean) => {},
});

export default function UserProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState(null);
  const [isguest, setIsguest] = useState(false);
  const [company, setCompany] = useState(null);
  const [isuserLoading, setIsuserLoading] = useState(true);
const router=useRouter();
  useEffect(() => {
    async function getUser() {
      try {
        const res = await fetch("/api/current-user", {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setUser(data.user);
          setCompany(data.company);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null);
      }
      finally{
        setIsuserLoading(false);
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
      value={{ user, setUser, company, setCompany, isguest, setIsguest,isuserLoading, setIsuserLoading }}
    >
      <HeaderWrapper />
      {
        children      }
    </UserContext.Provider>
  );
}
