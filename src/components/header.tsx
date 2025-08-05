"use client";
import { Box, Flex, Text, Button, TextField } from "@radix-ui/themes";
import { UserCircleIcon } from "lucide-react";
import Link from "next/link";
import SearchInput from "./search-input";
import LoginModal from "./modals/LoginModal";
import { useContext, useEffect, useState } from "react";
import SignupModal from "./modals/SignupModal";
import { UserContext } from "@/app/(group)/layout";
import AddCompanyModal from "./modals/AddCompanyModal";
import UserServices from "./modals/UserServices";
const links = [
  { label: "Home", href: "/" },
  { label: "Jobs", href: "/jobs" },
];

export default function Header() {
  const { user } = useContext(UserContext);
  // console.log(user);
  const [open, setOpen] = useState<boolean>(false);
  const [signUpOpen, setSignUpOpen] = useState<boolean>(false);
  return (
    <header className="sticky top-0 z-30 bg-gray-900">
      <Box
        width="100%"
        className="border-b border-gray-300 sticky top-0 bg-[--color-panel-solid] z-50"
        p="3"
      >
        <Flex
          justify="between"
          align="center"
          wrap="wrap"
          className="gap-4 sm:flex-row flex-col"
        >
          <Text size="4" weight="bold" color="indigo" asChild>
            <Link href="/">Jobzz</Link>
          </Text>

          <SearchInput />
          <Flex gap="4" align="center" className="flex-wrap justify-center">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <Text
                  size="2"
                  color="gray"
                  className="hover:text-indigo-600 transition cursor-pointer"
                >
                  {link.label}
                </Text>
              </Link>
            ))}
            {user?.company && (
              <Link href={"/add-job"}>
                <Text
                  size="2"
                  color="gray"
                  className="hover:text-indigo-600 transition cursor-pointer"
                >
                  Add job
                </Text>
              </Link>
            )}
            {!user?.company && <AddCompanyModal />}
            <Flex gap="4">
              {!user && (
                <div>
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
                </div>
              )}
            </Flex>
            <UserServices setOpen={setOpen} setSignUpOpen={setSignUpOpen} />
          </Flex>
        </Flex>
      </Box>
    </header>
  );
}
