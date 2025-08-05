"use client";
import { UserContext } from '@/app/(group)/layout';
import { Box, Flex, Heading, Separator, Text } from '@radix-ui/themes';
import { BookmarkIcon } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import CompanyJobCard from './cards/CompanyJobCard';

export default function CompanyDetailTab() {
    const [companyJobs, setCompanyJobs] = useState([]);
    const { company } = useContext(UserContext);

    useEffect(() => {
        async function fetchjobs() {
            const res = await fetch('/api/company/jobs');
            const data = await res.json();
            const jobs = data.data?.jobs || [];
            if (jobs) {
                setCompanyJobs(jobs);
            }
        }
        if (company) {
            fetchjobs();
        }
    }, [company]);

    return (
        <div>
            <Flex justify="between" align="start">
                <Box pt={"20px"}>
                    <Heading size="7">{company?.name}</Heading>
                    <Text size="2" className="text-muted-foreground">{company?.description}</Text>
                    <Heading size="6" mt={"20px"}>Job Opening</Heading>
                    <Separator my="3" size="4" />
                    <Flex direction={"column"} gap={"5"}>
                        {companyJobs.map((job, index) => (
                            <CompanyJobCard key={index} job={job}/>
                        ))}
                    </Flex>
                </Box>
                <BookmarkIcon className="text-muted-foreground cursor-pointer" />
            </Flex>
        </div>
    );
}
