import { Card, Flex, Heading, Text, Box, Button, Badge } from "@radix-ui/themes";
import { BriefcaseIcon, MapPinIcon, DollarSignIcon } from "lucide-react";

export default function CompanyJobCard({ job }:{job:any}) {
  return (
    <Card variant="classic" size="3" className="w-full">
      <Flex direction="column" gap="3">
        {/* Job Title */}
        <Heading size="4">{job.title}</Heading>

        {/* Meta Info */}
        <Flex gap="4" wrap="wrap">
          <Flex align="center" gap="2">
            <MapPinIcon size={16} />
            <Text size="2">{job.location}</Text>
          </Flex>

          <Flex align="center" gap="2">
            <Text size="2">₹{" "+job.salary.toLocaleString()}</Text>
          </Flex>

          <Flex align="center" gap="2">
            <BriefcaseIcon size={16} />
            <Text size="2">{job.employment_type}</Text>
          </Flex>

          <Flex align="center" gap="2">
            	<Badge color="blue">{job.job_type}</Badge>

          </Flex>
        </Flex>

        {/* Description */}
        <Box mt="2">
          <Text size="2" color="gray">
            {job.description.length > 150
              ? job.description.slice(0, 150) + "..."
              : job.description}
          </Text>
        </Box>

        {/* Apply Link or Info */}
        <Box mt="3">
          <Button variant="surface" asChild>
            <a href={job.apply_through} target="_blank" rel="noopener noreferrer">
              View Application Page
            </a>
          </Button>
        </Box>
      </Flex>
    </Card>
  );
}
