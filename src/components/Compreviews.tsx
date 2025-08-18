import {
  Badge,
  Box,
  Button,
  Flex,
  Separator,
  Text,
  TextArea,
} from "@radix-ui/themes";
import React, { useContext, useEffect, useState } from "react";
import { review, user } from "../../generated/prisma";
import { UserContext } from "@/app/(group)/layout";
import Loading from "./lodingstate/Loading";

type ReviewWithUser = review & {
  user: user;
};

export default function Compreviews({
  companyId,
  isloading,
}: {
  companyId: any;
  isloading: boolean;
}) {
  const [content, setContent] = useState<string>("");
  const { user } = useContext(UserContext);
  const [companyReview, setCompanyReview] = useState<ReviewWithUser[]>([]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch(`/api/review/${companyId}`);
        const data = await res.json();
        if (data.success) {
          setCompanyReview(data.data);
        }
      } catch {
        alert("Failed to fetch reviews.");
      }
    }
    fetchReviews();
  }, [companyId]);

  async function handleclick(e: React.MouseEvent) {
    e.preventDefault();

    try {
      const res = await fetch("/api/review/add", {
        method: "POST",
        body: JSON.stringify({ content, userId: user.id, companyId }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.success) {
        setCompanyReview([...companyReview, { ...data.data, user }]);
        setContent("");
      }
    } catch {
      alert("Something went wrong.");
    }
  }

  return (
    <Box className="max-w-7xl mx-auto w-full flex flex-col items-end">
      <Flex
        direction="column"
        gap="3"
        mb="5"
        align="end"
        className="w-full sm:w-[70%] lg:w-[50%]"
      >
        <TextArea
          placeholder="Leave a review..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full"
        />
        <Button variant="surface" onClick={handleclick}>
          Add Review
        </Button>
      </Flex>
      <Separator size="4" className="mb-4" />

      {isloading ? (
        <Loading />
      ) : companyReview?.length > 0 ? (
        <div className="flex flex-col gap-4 w-full sm:w-[70%] lg:w-[50%]">
          {companyReview.map((rev) => (
            <div
              key={rev.id}
              className="relative bg-zinc-900 text-white rounded-2xl shadow-lg p-4 transition duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer"
            >
              <Badge
                color="green"
                className="rounded-xl absolute top-[-10px] left-0 mb-2 block"
              >
                {rev.user?.name ?? "Anonymous"}
              </Badge>
              <Text size="2" color="gray" className="leading-relaxed">
                {rev.content}
              </Text>
            </div>
          ))}
        </div>
      ) : (
        <Text size="2" color="gray">
          No reviews yet.
        </Text>
      )}
    </Box>
  );
}
