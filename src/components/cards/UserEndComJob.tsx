import { Card, Flex, Heading, Text, Box, Button, Badge } from "@radix-ui/themes";
import { BriefcaseIcon, MapPinIcon, DollarSignIcon } from "lucide-react";
import CompJobCardDropD from "../dropdowns/CompJobCardDropD";

export default function UserEndComJob({ job }:{job:any}) {
  console.log("job",job)
  return (
    <Card variant="classic" size="3" className="w-full">
      <Flex direction="column" gap="3">
        <Flex direction={'row'} justify={"between"} width={"full"}>

        <Heading size="4">{job?.title}</Heading>
        </Flex>

        <Flex gap="4" wrap="wrap">
          <Flex align="center" gap="2">
            <MapPinIcon size={16} />
            <Text size="2">{job?.location}</Text>
          </Flex>

          <Flex align="center" gap="2">
            <Text size="2">₹{" "+job.salary?.toLocaleString()}</Text>
          </Flex>
          <Flex align="center" gap="2">
            <BriefcaseIcon size={16} />
            <Text size="2">{job?.employment_type}</Text>
          </Flex>

          <Flex align="center" gap="2">
            	<Badge color="blue">{job?.job_type}</Badge>

          </Flex>
        </Flex>

        <Box mt="2">
          <Text size="2" color="gray">
            {job.description.length > 150
              ? job.description.slice(0, 150) + "..."
              : job.description}
          </Text>
        </Box>

        <Box mt="3">
          <Button variant="surface" asChild>
            <a href={`/jobs/${job.id}`} target="_blank" rel="noopener noreferrer">
              View Application Page
            </a>
          </Button>
        </Box>
      </Flex>
    </Card>
  );
}
