"use client";
import {
  Skeleton,
  Card,
  Flex,
  Box,
} from "@radix-ui/themes";

export default function CardLoading({ fromSearch = false }: { fromSearch?: boolean }) {
  return (
    <Card
      style={{
        minWidth: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
      }}
    >
      <Flex align="start" justify="between" style={{ marginBottom: 10 }}>
        <Skeleton height="24px" width="70%" />
        <Skeleton height="24px" width="60px" style={{ borderRadius: "12px" }} />
      </Flex>

      <Box className="flex-1 space-y-2">
        <Skeleton height="12px" width="100%" />
        <Skeleton height="12px" width="95%" />
        <Skeleton height="12px" width="98%" />
        <Skeleton height="12px" width="80%" />
      </Box>

      <Skeleton
        height="20px"
        width="80px"
        style={{ borderRadius: "12px", margin: "5px 0" }}
      />

      <Flex align="center" justify="between" style={{ marginTop: "auto" }}>
        <Flex align="center" gap="3">
          <Skeleton width="40px" height="40px" style={{ borderRadius: "50%" }} />
          <Box>
            <Skeleton height="14px" width="160px" />
            <Skeleton height="12px" width="70px" />
          </Box>
        </Flex>

        <Skeleton
          height="32px"
          width="100px"
          style={{ borderRadius: "8px" }}
        />
      </Flex>
    </Card>
  );
}
