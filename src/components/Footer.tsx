"use client";

import { Box, Flex, Text, Separator, Link as RadixLink, IconButton } from "@radix-ui/themes";
import { Github, Linkedin, Twitter } from "lucide-react"; 

export default function Footer() {
  return (
    <Box className="w-full border-t border-gray-700 mt-10 bg-[hsl(240,10%,5%)]">
      <div className="w-full m-auto">

      <Flex
        direction="column"
        gap="6"
        className="max-w-7xl m-auto py-10 px-6 text-gray-300"
      >
        <Flex direction={{ initial: "column", md: "row" }} justify="between" gap="8">
          <Box>
            <Flex gap={"4"} align={"center"}>

            <Text size="5" weight="bold" className="text-white">
              Jobzz
            </Text>
            <Text size="2" color="gray">
              Find your dream job with precision.
            </Text>
            </Flex>
          </Box>

          <Flex gap="10" wrap="wrap">
            <Flex direction="column" gap="2">
              <Text weight="bold" size="3" className="text-white">
                Jobs
              </Text>
              <RadixLink href="/jobs" size="2">Browse Jobs</RadixLink>
              <RadixLink href="/companies" size="2">Companies</RadixLink>
              <RadixLink href="/remote" size="2">Remote</RadixLink>
            </Flex>

            <Flex direction="column" gap="2">
              <Text weight="bold" size="3" className="text-white">
                Resources
              </Text>
              <RadixLink href="/blog" size="2">Blog</RadixLink>
              <RadixLink href="/faq" size="2">FAQ</RadixLink>
              <RadixLink href="/support" size="2">Support</RadixLink>
            </Flex>

            <Flex direction="column" gap="2">
              <Text weight="bold" size="3" className="text-white">
                Company
              </Text>
              <RadixLink href="/about" size="2">About Us</RadixLink>
              <RadixLink href="/contact" size="2">Contact</RadixLink>
              <RadixLink href="/privacy" size="2">Privacy Policy</RadixLink>
            </Flex>
          </Flex>
        </Flex>

        <Separator orientation="horizontal" size={"4"} />

        <Flex justify="between" align="center" direction={{ initial: "column", md: "row" }} gap="4">
          <Text size="2" color="gray">
            © {new Date().getFullYear()} JobDeck. All rights reserved.
          </Text>

          <Flex gap="3">
            <IconButton variant="ghost" color="gray" asChild>
              <a href="https://github.com" target="_blank"><Github className="w-5 h-5" /></a>
            </IconButton>
            <IconButton variant="ghost" color="gray" asChild>
              <a href="https://linkedin.com" target="_blank"><Linkedin className="w-5 h-5" /></a>
            </IconButton>
            <IconButton variant="ghost" color="gray" asChild>
              <a href="https://twitter.com" target="_blank"><Twitter className="w-5 h-5" /></a>
            </IconButton>
          </Flex>
        </Flex>
      </Flex>
        </div>
    </Box>
  );
}
