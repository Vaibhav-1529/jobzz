"use client";

import { Flex, Text, Spinner } from "@radix-ui/themes";

export default function Loading() {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className="h-screen w-full bg-background"
      gap="4"
    >
      <Spinner size="3" />
      <Text size="3" weight="medium" color="gray">
        Loading, please wait...
      </Text>
    </Flex>
  );
}
