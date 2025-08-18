"use client";

import { Box, Heading, Separator, Text } from "@radix-ui/themes";
import { company } from "../../generated/prisma";
import Loading from "./lodingstate/Loading";

export default function AboutCompany({
  company,
  isLoading,
}: {
  company: company | null;
  isLoading: boolean;
}) {
  if (isLoading) {
    return <Loading />;
  }

  if (!company) {
    return (
      <Box className="max-w-7xl mx-auto w-full">
        <Text size="2" color="gray">
          No company information available.
        </Text>
      </Box>
    );
  }

  return (
    <Box className="max-w-7xl mx-auto w-full space-y-4">
      <Heading size="7">{company.name}</Heading>

      <Separator size="4" />

      <Box>
        <Heading size="4" mb="2">
          About Us
        </Heading>
        <Text size="2" color="gray">
          {company.description || "No description available."}
        </Text>
      </Box>

      <Box>
        <Heading size="4" mb="2">
          Owner Information
        </Heading>
        <Text size="2" color="gray">
          Owner ID: {company.ownerId}
        </Text>
      </Box>
    </Box>
  );
}
