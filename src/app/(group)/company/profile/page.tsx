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
import { BookmarkIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CompanyJobCard from "@/components/cards/CompanyJobCard";
import { job, user, review, company } from "../../../../../generated/prisma";
import Compreviews from "@/components/Compreviews";
import { UserContext } from "../../layout";

type ReviewWithUser = review & {
  user: user;
};

type CompanyWithRelations = company & {
  jobs: job[] | null;
  review: review[] | null;
};
export default function Page() {
  const params = useParams();
  const id = params?.id as string;
  const { company } = useContext(UserContext);
  const [Jobcompany, setJobCompany] = useState<CompanyWithRelations | null>(
    null
  );
  const [companyJobs, setCompanyJobs] = useState<job[] | null>([]);

  useEffect(() => {
    async function fetchCompany() {
      try {
        console.log("Fetching for company ID:", company?.id);
        const res = await fetch(`/api/company/profile/${company?.id}`);
        const data = await res.json();

        console.log("API response:", data);

        if (data.success) {
          setJobCompany(data.data as CompanyWithRelations);
          if (data.data?.jobs) {
            setCompanyJobs(data.data.jobs);
          }
        }
      } catch (error) {
        console.error("Error fetching company:", error);
      }
    }

    if (company?.id) {
      fetchCompany();
    } else {
      console.warn("Company ID is not available yet.");
    }
  }, [company?.id]);

  return (
    <Box p="5" className="min-h-screen m-auto">
      <Flex justify="between" align="start">
        <Box mr="5">
          <Box mb="4">
            <Heading size="7">{Jobcompany?.name || "Company Name"}</Heading>
            <Text size="2" color="gray">
              {Jobcompany?.description || "Company description goes here."}
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
                    {Jobcompany?.description || "No description available."}
                  </Text>
                </Box>
              </Tabs.Content>

              <Tabs.Content value="jobopening">
                <Box className="w-[90vw]">
                  <Heading size="6" mb="3">
                    Open Positions
                  </Heading>
                  <Separator size="4" mb="4" />
                  <Flex direction="column" gap="4">
                    {companyJobs && companyJobs?.length > 0 ? (
                      companyJobs?.map((job) => (
                        <CompanyJobCard key={job.id} job={job} />
                      ))
                    ) : (
                      <Text size="2" color="gray">
                        No job openings found.
                      </Text>
                    )}
                  </Flex>
                </Box>
              </Tabs.Content>

              <Tabs.Content value="reviews">
                <Compreviews companyId={Jobcompany?.id} />
              </Tabs.Content>
            </Box>
          </Tabs.Root>
        </Box>
      </Flex>
    </Box>
  );
}
