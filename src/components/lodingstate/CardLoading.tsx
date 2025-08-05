"use client";
import {
  Skeleton,
  Card,
  Flex,
  Box,
  Text,
  Avatar,
  Badge,
} from "@radix-ui/themes";

export default function CardLoading({ fromSearch = false }: { fromSearch?: boolean }) {
  return (
    <Card
      style={{
        maxWidth: fromSearch ? "100%" : "35%",
        minWidth: 350,
        maxHeight:"260px",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1rem",
      }}
    >
      {/* Title and category */}
      <Flex align="start" justify="between">
        <Box style={{ flexGrow: 1 }}>
          <Skeleton height="24px" width="70%" />
        </Box>
        <Skeleton height="24px" width="60px" style={{borderRadius:"full"}} />
      </Flex>

      {/* Description */}
      <Box className="space-y-2">
        <Skeleton height="12px" width="100%" />
        <Skeleton height="12px" width="95%" />
        <Skeleton height="12px" width="98%" />
        <Skeleton height="12px" width="80%" />
      </Box>
      <Skeleton height="20px" width="80px" style={{borderRadius:"full"}} />

      <Flex align="center" justify="between">
        <Flex align="center" gap="3">
          <Skeleton >
            <Avatar size="2" fallback="." />
          </Skeleton>
          <Box>
            <Skeleton height="14px" width="100px" />
            <Skeleton height="12px" width="70px" />
          </Box>
        </Flex>

        <Skeleton height="32px" width="100px" style={{borderRadius:"20%"}} />
      </Flex>
    </Card>
  );
}
