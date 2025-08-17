"use client";
import JobApplyBtn from "@/components/JobApplyBtn";
import AppliedUserList from "@/components/modals/AppliedUserList";
import {
  Box,
  Flex,
  Heading,
  Text,
  Separator,
  Button,
  Card,
  Avatar,
} from "@radix-ui/themes";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { user } from "../../../../../generated/prisma";
import { Check, CheckCheck } from "lucide-react";
import WithdrawlBtn from "@/components/WithdrawalBtn";
import { UserContext } from "../../layout";
import Loading from "@/components/lodingstate/Loading";
type Company = {
  id: string;
  name: string;
};

type Job = {
  id: string;
  title: string;
  description: string;
  location: string;
  salary: number;
  employment_type: string;
  job_type: string;
  apply_through: string;
  company: Company;
};
export default function page() {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isAppModal, setIsAppModal] = useState<boolean>(false);
  const [applicants, setApplicants] = useState<user[]>([]);
  const [isApplied, setIsApplied] = useState<boolean>(false);
  const { id } = useParams();
  const { user } = useContext(UserContext);
  useEffect(() => {
    async function fetchJob() {
      setLoading(true);
      try {
        const res = await fetch(`/api/job/${id}`);
        if (!res.ok) throw new Error("Job not found");

        const data = await res.json();
        setJob(data);
      } catch (err) {
        console.error("Failed to load job:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchJob();
  }, [id]);
  useEffect(() => {
    async function fetchaplicants() {
      try {
        const res = await fetch(`/api/applicants/${job?.id}`);
        const data = await res.json();
        setApplicants(data.data);
        if (
          Array.isArray(data.data) &&
          data.data.find((item: user) => item.id == user?.id)
        ) {
          setIsApplied(true);
        }
      } catch (err) {
        console.error("Failed to load job:", err);
      } finally {
        setIsAppModal(false);
      }
    }
    if (job) fetchaplicants();
  }, [job, isApplied]);
  if (loading) {
    return <Loading/>;
  }

  if (!job) {
    return <Text color="red">Job not found.</Text>;
  }

  return (
    <Box className="max-w-4xl mx-auto p-6 space-y-6">
      <Flex align="center" justify="between" wrap="wrap" className="gap-4">
        <Box>
          <Heading size="6" className="mb-1">
            {job.title}
          </Heading>
          <Text size="3" color="gray">
            {job.location} • {job.job_type} • {job.employment_type}
          </Text>
        </Box>
        <Flex justify="start" gap="4" wrap="wrap">
          <Button
            onClick={(e) => {
              e.preventDefault();
              setIsAppModal(true);
            }}
            size="3"
            variant="outline"
            className="border-blue-600"
          >
            Total Applicants
          </Button>
          {!isApplied ? (
            <JobApplyBtn
              job={job}
              isApplied={isApplied}
              setIsApplied={setIsApplied}
            />
          ) : (
            <WithdrawlBtn
              job={job}
              isApplied={isApplied}
              setIsApplied={setIsApplied}
            />
          )}
        </Flex>
      </Flex>

      <Separator size={"4"} />

      <Card size="2" className="bg-gray-100 dark:bg-gray-900">
        <Flex align="center" gap="4">
          <Avatar
            fallback={job.company.name.charAt(0).toUpperCase()}
            size="4"
            radius="full"
            src=""
          />
          <Box>
            <Text size="4" weight="medium">
              {job.company.name}
            </Text>
          </Box>
        </Flex>
      </Card>

      <Box>
        <Heading size="4" mb="2">
          Job Description
        </Heading>
        <Text as="p" size="3" color="gray">
          {job.description}
        </Text>
      </Box>

      <Box>
        <Heading size="4" mb="2">
          Details
        </Heading>
        <Flex direction="column" gap="2">
          <Text>
            <strong>Salary:</strong> ₹{job.salary}
          </Text>
          <Text>
            <strong>Employment Type:</strong> {job.employment_type}
          </Text>
          <Text>
            <strong>Job Type:</strong> {job.job_type}
          </Text>
          <Text>
            <strong>Location:</strong> {job.location}
          </Text>
        </Flex>
      </Box>
      {isAppModal && (
        <AppliedUserList
          isAppModal={isAppModal}
          setIsAppModal={setIsAppModal}
          applicants={applicants}
        />
      )}
    </Box>
  );
}
