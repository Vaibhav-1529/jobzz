//@ts-nocheck
import {
  Avatar,
  Box,
  Card,
  Flex,
  Text,
  Button,
  Badge,
  ThickChevronRightIcon,
} from "@radix-ui/themes";
import Link from "next/link";
import JobApplyBtn from "../JobApplyBtn";
import { job } from "../../../generated/prisma";


export default function Jobcard({
  job:job,
  fromSearch = false,
}: {
  job;
  fromSearch: boolean;
}) {
  return (
    <Card
      style={{
        maxWidth: fromSearch ? "30%" : "25%",
        minWidth: 350,
        height:"100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Flex align="start" justify={"between"} style={{ margin: 10 }}>
        <h2 className="lg:text-2xl text-md md:text-xl truncate">
          {job.title}
        </h2>
        <Badge color="blue">{job.employment_type}</Badge>
      </Flex>
      <div className="flex-1">
        <p className="line-clamp-5 md:text-md text-sm">{job.description}</p>
      </div>
      <Badge color="blue" style={{ margin: "10px 0", width: "min-content" }}>
        {job.location}
      </Badge>
      <Flex align={"center"} gap={"6px"} justify={"between"}>
        <Box maxWidth="240px">
          <Link href={`/company/profile/${job.company.id}`}>
          <Card>
            <Flex gap="3" align="center">
              <Avatar
                size="2"
                src={job.employer_logo || ""}
                radius="full"
              fallback={job?.company?.name?.charAt(0).toUpperCase() || "C"}
                />
              <Box >
                <Text as="div" className="line-clamp-1 " size="2" weight="bold">
                  {job.company.name}
                </Text>
              </Box>
            </Flex>
          </Card>
                </Link>
        </Box>
        <Button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link href={`/jobs/${job.id}`}>
          <Text>View Job</Text>
          </Link>
          <ThickChevronRightIcon />
        </Button>
        <JobApplyBtn job={job}/>
      </Flex>
    </Card>
  );
}
