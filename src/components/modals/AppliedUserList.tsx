
import {
  Dialog,
  Text,
  Avatar,
  Box,
  Heading,
  Flex,
  Badge,
} from "@radix-ui/themes";
import { useContext, useEffect, useState } from "react";
import { user } from "../../../generated/prisma";
import { UserContext } from "@/app/(group)/layout";

export default function AppliedUserList({isAppModal,setIsAppModal,applicants}:{isAppModal:boolean,setIsAppModal:(value:boolean)=>void,applicants:user[]}) {
    console.log("hello",applicants);
      const {user}=useContext(UserContext)
  
  return (
    <Dialog.Root open={isAppModal} onOpenChange={setIsAppModal}>
      <Dialog.Content
        style={{
          maxHeight: "300px",
          maxWidth: "450px",
          display: "flex",
          flexDirection: "column",
          padding: "16px",
        }}
      >
        <Box>
          <Flex justify="start">
            <Box className="w-[70%]">
              <Dialog.Title>Applicants List..</Dialog.Title>
              <Dialog.Description size="2" mb="3">
                The following Applicants list
              </Dialog.Description>
            </Box>
          </Flex>
        </Box>

        <Box
          style={{
            overflowY: "auto",
            flexGrow: 1,
            paddingRight: "4px",
          }}
          className="scrollbar-hidden"
        >
          <Flex direction="column" gap="4">
            {applicants &&applicants.length > 0 ? (
              applicants.map((applicant:user, idx) => (
                <Flex
                  key={idx}
                  className="hover:border-1 px-3 py-1.5 hover:border-gray-500 rounded-md"
                  direction="row"
                  align="center"
                  justify={"between"}
                  gap="3"
                >
                  <Flex direction="row" align="center" gap="3">
                    <Avatar
                      size="3"
                      fallback={applicant?.name?.charAt(0).toUpperCase() || "U"}
                      radius="full"
                      src={
                        "https://pbs.twimg.com/profile_images/1337055608613253126/.png"
                      }
                    />
                    <Box>
                      <Heading size="3" as="h3" color="blue">
                        {applicant?.name || "Unknown"}
                      </Heading>

                      <Text as="div" size="2" color="gray" mb="2">
                        {applicant?.email || "No email found"}
                      </Text>
                    </Box>
                  </Flex>
                  <Flex justify={"start"} gap={"6"}>
                    {applicant.email==user?.email&&  <Badge color="green">Active</Badge>}
                  </Flex>
                </Flex>
              ))
            ) : (
              <Text size="2" color="gray">
                No users found.
              </Text>
            )}
          </Flex>
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  ); 
}

