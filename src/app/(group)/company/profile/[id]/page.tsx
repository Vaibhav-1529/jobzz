"use client";

import {
  Box,
  Button,
  Flex,
  Heading,
  Separator,
  Tabs,
  Text,
  TextArea,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { job, user, review, company } from "../../../../../../generated/prisma"; 
import Compreviews from "@/components/Compreviews";
import UserEndComJob from "@/components/cards/UserEndComJob";

type ReviewWithUser = review & {
  user: user;
};

type CompanyWithRelations = company & {
  jobs: job[]|null;
  review: review[]|null;
};

export default function Page() {
  const params = useParams();
  const id = params?.id as string;

  const [company, setCompany] = useState<CompanyWithRelations | null>(null);
  const [companyJobs, setCompanyJobs] = useState<job[] | null>([]);

  useEffect(() => {
    async function fetchCompany() {
      const res = await fetch(`/api/company/profile/${id}`);
      const data = await res.json();
      if (data.success) {
        setCompany(data.data as CompanyWithRelations);
      }
      if(data?.data?.jobs){
        setCompanyJobs(data?.data?.jobs)
      }

    }

    if (id) fetchCompany();
  }, [id]);

  return (
    <Box p="5" className="min-h-screen m-auto">
      <Flex justify="between" align="start">
        <Box  mr="5">
          <Box mb="4">
            <Heading size="7">{company?.name || "Company Name"}</Heading>
            <Text size="2" color="gray">
              {company?.description || "Company description goes here."}
            </Text>
          </Box>

          <Tabs.Root defaultValue="about">
            <Tabs.List size="2" mb="4">
              <Tabs.Trigger value="about">About</Tabs.Trigger>
              <Tabs.Trigger value="jobopening">Job Openings</Tabs.Trigger>
              <Tabs.Trigger value="reviews">Reviews</Tabs.Trigger>
            </Tabs.List>

            <Box>
              <Tabs.Content value="about">
                <Box className="w-[90vw]">

                <Text size="2" color="gray">
                  {company?.description || "No description available."}
                </Text>
                </Box>
              </Tabs.Content>

              <Tabs.Content value="jobopening">
                <Box className="w-[90vw]">
                <Heading size="6" mb="3">Open Positions</Heading>
                <Separator size="4" mb="4" />
                <Flex direction="column" gap="4">
                  {companyJobs&&companyJobs?.length > 0 ? (
                    companyJobs?.map((job) => (
                      <UserEndComJob key={job.id} job={job} />
                    ))
                  ) : (
                    <Text size="2" color="gray">No job openings found.</Text>
                  )}
                </Flex>
                  </Box>
              </Tabs.Content>

              <Tabs.Content value="reviews">
                  <Compreviews companyId={company?.id}/>
              </Tabs.Content>
            </Box>
          </Tabs.Root>
        </Box>
      </Flex>
    </Box>
  );
}
