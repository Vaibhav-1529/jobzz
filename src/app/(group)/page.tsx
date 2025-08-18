"use client";

import Link from "next/link";
import { Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { Briefcase, MapPin, Star, Users, Rocket, Mail } from "lucide-react";
import { motion } from "framer-motion";

const featuredJobs = [
  {
    id: "1",
    title: "Full Stack Developer",
    company: "InnovateX Solutions",
    type: "Remote",
    location: "Bangalore",
    logo: "",
  },
  {
    id: "2",
    title: "UI/UX Designer",
    company: "PixelForge Studio",
    type: "On-site",
    location: "Delhi",
    logo: "",
  },
  {
    id: "3",
    title: "Data Analyst",
    company: "InsightEdge Analytics",
    type: "Hybrid",
    location: "Mumbai",
    logo: "",
  },
];

export default function Home() {
  return (
    <main className="px-4 md:px-24 py-8 space-y-19">
      <section className="text-center space-y-6">
        <Heading size="9">Find Jobs That Matter</Heading>
        <Text size="5"  className="py-4 text-gray-600">
          Connecting professionals with top companies for the best opportunities
        </Text>
        <Flex justify="center" gap="4" className="mt-6">
          <Link href="/jobs">
            <Button size="4" color="blue">Explore Jobs</Button>
          </Link>
          <Link href="#">
            <Button size="4" variant="surface">Post a Job</Button>
          </Link>
        </Flex>
      </section>

      <section>
        <Heading size="6" className="pb-3 text-center">Why Choose Jobzz?</Heading>
        <Flex wrap="wrap" gap="6" className="mt-5" justify="center">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Card size="3" className="w-80">
              <Flex direction="column" gap="3">
                <Rocket className="text-blue-500" size={32} />
                <Heading size="4">Quick Applications</Heading>
                <Text>Apply to jobs in seconds with your JobNest profile.</Text>
              </Flex>
            </Card>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Card size="3" className="w-80">
              <Flex direction="column" gap="3">
                <Users className="text-green-500" size={32} />
                <Heading size="4">Verified Companies</Heading>
                <Text>All employers are verified to ensure real opportunities.</Text>
              </Flex>
            </Card>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Card size="3" className="w-80">
              <Flex direction="column" gap="3">
                <Star className="text-yellow-500" size={32} />
                <Heading size="4">Top Talent Network</Heading>
                <Text>Join a platform trusted by over 50,000 professionals.</Text>
              </Flex>
            </Card>
          </motion.div>
        </Flex>
      </section>

<section className="w-full px-4 sm:px-6 lg:px-8 py-10">
  <Heading
    size="6"
    className="mb-6 text-center mx-auto flex py-3 justify-center w-full"
  >
    Featured Jobs
  </Heading>
<Flex className="w-full justify-center max-w-7xl mx-auto ">
  <div
    className="
      grid 
      gap-6 
      sm:grid-cols-1 
      md:grid-cols-2 
      lg:grid-cols-3 
      w-full
    "
  >
    {featuredJobs.map((job) => (
      <motion.div key={job.id} whileHover={{ y: -5 }}>
        <Card
          size="3"
          className="cursor-pointer transition-shadow hover:shadow-md w-full"
        >
          <Flex gap="4">
            <Flex direction="column">
              <Heading size="4">{job.title}</Heading>
              <Text>{job.company}</Text>
              <Flex
                gap="2"
                mt="2"
                align="center"
                className="text-sm text-gray-600 flex-wrap"
              >
                <MapPin size={14} />
                {job.location}
                <Briefcase size={14} />
                {job.type}
              </Flex>
            </Flex>
          </Flex>
        </Card>
      </motion.div>
    ))}
  </div>
</Flex>

</section>


      <section className="text-center space-y-6">
        <Heading size="6">What Our Users Say</Heading>
        <Text className="max-w-2xl mx-auto text-gray-600">
          "JobNest made it super easy for me to find a remote job that matches my skills. The interface is clean, and I love how fast the application process is!"
        </Text>
        <Text className="font-semibold">— Priya Mehra, Product Designer</Text>
      </section>

    </main>
  );
}
