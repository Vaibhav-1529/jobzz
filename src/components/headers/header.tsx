"use client";

import { Box, Flex, Text } from "@radix-ui/themes";
import { Menu } from "lucide-react";
import Link from "next/link";
import SearchInput from "../search-input";
import LoginModal from "../modals/LoginModal";
import SignupModal from "../modals/SignupModal";
import AddCompanyModal from "../modals/AddCompanyModal";
import UserServices from "../modals/UserServices";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/(group)/layout";
import { HeaderContext } from "./headerWrapper";

const links = [
  { label: "Home", href: "/" },
  { label: "Jobs", href: "/jobs" },
];

export default function Header() {
  const { user, company } = useContext(UserContext);
  const headerCtx = useContext(HeaderContext);
  if (!headerCtx) return null;

  const { open, setOpen, signUpOpen, setSignUpOpen } = headerCtx;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(()=>{
    setTimeout(() => {
      setOpen(true);
    }, 5000);
  },[])
  return (
    <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800 w-full">
      <Box p="3" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Flex
          direction="row"
          justify="between"
          align="center"
          className="w-full flex-wrap gap-1 md:gap-6"
        >
          <div className="flex items-center justify-between w-full md:w-auto">
            <Text size="4" weight="bold" color="indigo" asChild>
              <Link href="/" className="text-xl sm:text-2xl whitespace-nowrap">
                Jobzz
              </Link>
            </Text>

            <div className="block md:hidden">
              <Menu
                className="w-6 h-6 text-white cursor-pointer"
                onClick={() => setIsMenuOpen((prev) => !prev)}
              />
            </div>
          </div>

          <div className="w-full mt-3 md:mt-0 md:w-auto md:flex-1 flex  justify-center items-center gap-2 md:ml-6">
            <SearchInput />


          <div className="hidden md:flex items-center gap-4 ml-auto">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <Text
                  size="2"
                  color="gray"
                  className="hover:text-indigo-500 transition cursor-pointer"
                >
                  {link.label}
                </Text>
              </Link>
            ))}

            {company ? (
              <Link href="/add-job">
                <Text
                  size="2"
                  color="gray"
                  className="hover:text-indigo-500 transition cursor-pointer"
                >
                  Add Job
                </Text>
              </Link>
            ) : (
              company&&<AddCompanyModal />
            )}

            {!user && (
              <>
                <LoginModal
                  open={open}
                  setOpen={setOpen}
                  setSignUpOpen={setSignUpOpen}
                />
                <SignupModal
                  signUpOpen={signUpOpen}
                  setSignUpOpen={setSignUpOpen}
                  setOpen={setOpen}
                />
              </>
            )}
          </div>
                        <UserServices />

          </div>
        </Flex>

        {isMenuOpen&&user && (
          <div className="md:hidden w-full flex flex-col justify-end items-center mt-4 space-y-2">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="w-[80%] py-1 px-2  flex justify-center">
                <Text
                onClick={()=>setIsMenuOpen(false)}
                  size="2"
                  color="gray"
                  className="block w-auto hover:text-indigo-500 transition cursor-pointer"
                >
                  {link.label}
                </Text>
              </Link>
            ))}

            {company ? (
              <Link href="/add-job" className="w-[80%] py-1 px-2  flex justify-center">
                <Text
                  size="2"
                  color="gray"
                  className="block hover:text-indigo-500 transition cursor-pointer"
                >
                  Add Job
                </Text>
              </Link>
            ) : 
              
                user&&<AddCompanyModal />
              
            }

            {!user && (
              <>
                <LoginModal
                  open={open}
                  setOpen={setOpen}
                  setSignUpOpen={setSignUpOpen}
                />
                <SignupModal
                  signUpOpen={signUpOpen}
                  setSignUpOpen={setSignUpOpen}
                  setOpen={setOpen}
                />
              </>
            )}
          </div>
        )}
      </Box>
    </header>
  );
}
