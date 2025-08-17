"use client";

import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Separator,
  Tabs,
  Text,
  TextField,
} from "@radix-ui/themes";
import {
  MailIcon,
  UserIcon,
  StarIcon,
  PhoneIcon,
  GlobeIcon,
  CalendarIcon,
  MapPinIcon,
  Building2Icon,
  BookmarkIcon,
} from "lucide-react";
import { useContext } from "react";
import { UserContext } from "../layout";
import CompanyDetailTab from "@/components/CompanyDetailTab";
import Loading from "@/components/lodingstate/Loading";

export default function ProfilePage() {
  const { user, company } = useContext(UserContext);
  if(!user)
    return <Loading/>
  return (
    <main className="max-w-6xl mx-auto mt-10 px-4 text-foreground">
      <Flex gap="8" className="flex-col md:flex-row">
        <Box className="flex-1 space-y-6">
          <Card className="p-4">
            <Flex className="gap-3 justify-center items-center">

            <Box>
              <Avatar
                size="7"
                fallback={
                  typeof user?.name === "string"
                    ? user.name[0].toUpperCase()
                    : "U"
                }
                radius="full"
                src="https://pbs.twimg.com/profile_images/1337055608613253126/.png"
              />{" "}
            </Box>
            <Box>
              <Heading size="5">{user?.name}</Heading>
              <Text size="2" className="text-muted-foreground">
                {user.email}
              </Text>

              <Flex gap="1" mt="2">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4 text-yellow-400" />
                ))}
              </Flex>
            </Box>
                        </Flex>

          </Card>

          <Card className="p-4 space-y-3">
            <Heading size="3">Work</Heading>
            <Box>
              <Text className="font-medium">Spotify New York</Text>
              <Text size="1">110 William Street, NY</Text>
            </Box>
            <Box>
              <Text className="font-medium">Metropolitan Museum</Text>
              <Text size="1">525 E 68th Street, NY</Text>
            </Box>
          </Card>

          <Card className="p-4 space-y-2">
            <Heading size="3">Skills</Heading>
            <Text size="1">Branding, UI/UX, Web Design, Editorial</Text>
          </Card>
        </Box>

        <Box className="flex-[2] space-y-6">
          <Card className="p-6 space-y-3">
            <Flex justify="between" align="start">
              <Box>
                <Heading size="5">{user?.name}</Heading>
                <Text size="2" className="text-muted-foreground">
                  Product Designer · New York, NY
                </Text>

                <Flex gap="1" mt="2">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 text-yellow-400" />
                  ))}
                </Flex>
              </Box>
            </Flex>

            <Flex gap="4" mt="4">
              <Button variant="solid">Send Message</Button>
              <Button variant="outline">Contacts</Button>
            </Flex>
          </Card>

          <Tabs.Root defaultValue="about">
            <Tabs.List>
              <Tabs.Trigger value="about">About</Tabs.Trigger>
              <Tabs.Trigger value="company">Company</Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="about">
              <Card className="p-6 grid md:grid-cols-2 gap-6 mt-4">
                <Box>
                  <Heading size="4" mb="2">
                    Contact Info
                  </Heading>
                  <Text className="flex items-center gap-2">
                    <PhoneIcon className="w-4 h-4" /> +91 123 456 7890
                  </Text>
                  <Text className="flex items-center gap-2">
                    <MailIcon className="w-4 h-4" /> {user?.email}
                  </Text>
                  <Text className="flex items-center gap-2">
                    <GlobeIcon className="w-4 h-4" /> www.jeremyrose.com
                  </Text>
                  <Text className="flex items-center gap-2">
                    <MapPinIcon className="w-4 h-4" /> New York, USA
                  </Text>
                </Box>

                <Box>
                  <Heading size="4" mb="2">
                    Basic Info
                  </Heading>
                  <Text className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" /> Birthday: June 5, 1992
                  </Text>
                  <Text className="flex items-center gap-2">
                    <UserIcon className="w-4 h-4" /> Gender: Male
                  </Text>
                  <Text className="flex items-center gap-2">
                    <Building2Icon className="w-4 h-4" /> Company:{" "}
                    {company?.name || "N/A"}
                  </Text>
                </Box>
              </Card>
            </Tabs.Content>
            <Tabs.Content value="company">
              <CompanyDetailTab />
            </Tabs.Content>
          </Tabs.Root>
        </Box>
      </Flex>
    </main>
  );
}
