"use client";

import { Box, Flex, Text } from "@radix-ui/themes";
import { UserCircleIcon } from "lucide-react";
import Link from "next/link";
import SearchInput from "../search-input";
import LoginModal from "../modals/LoginModal";
import { useContext } from "react";
import SignupModal from "../modals/SignupModal";
import { UserContext } from "@/app/(group)/layout";
import AddCompanyModal from "../modals/AddCompanyModal";
import UserServices from "../modals/UserServices";
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

  return (
    <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800">
      <Box p="3" className="w-full">
        <Flex
          direction={{ initial: "column", sm: "row" }}
          justify="between"
          align="center"
          gap="4"
          className="w-full flex-wrap"
        >
          <Text size="4" weight="bold" color="indigo" asChild>
            <Link href="/" className="text-xl sm:text-2xl">
              Jobzz
            </Link>
          </Text>

          <div className="w-full sm:w-auto">
            <SearchInput />
          </div>

          <Flex
            gap="4"
            align="center"
            className="flex-wrap justify-center sm:justify-end w-full sm:w-auto"
          >
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
              <AddCompanyModal />
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

            <UserServices />
          </Flex>
        </Flex>
      </Box>
    </header>
  );
}
