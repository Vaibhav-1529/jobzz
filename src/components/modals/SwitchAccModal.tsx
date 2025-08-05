"use client";

import { useContext, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Text,
  Avatar,
  Box,
  Heading,
  Flex,
} from "@radix-ui/themes";
import { UserContext } from "@/app/(group)/layout";
import { EllipsisVertical } from "lucide-react";
import SwitchAccDropD from "../dropdowns/SwitchAccDropD";

export default function SwitchAccModal({
  isSwitchAcc,
  setIsSwitchAcc,
}: {
  isSwitchAcc: boolean;
  setIsSwitchAcc: Function;
}) {
  const { setUser } = useContext(UserContext);
  const [usersData, setUsersData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("http://localhost:3000/api/switch", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        console.log("data", data);
        if (data?.success && Array.isArray(data.users)) {
          setUsersData(data.users);
        } else {
          console.warn("No users returned");
        }
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    }

    fetchUsers();
  }, []);
async function handleSwitch(id: string) {
  try {
    const res = await fetch(`/api/switch/${id}`);
    const data = await res.json();

    if (data.success) {
      setUser(data.user);
      setTimeout(() => {
        setIsSwitchAcc(false); 
      }, 200); 
    }
  } catch (err) {
    console.log(err);
  }
}

  return (
    <Dialog.Root open={isSwitchAcc} onOpenChange={setIsSwitchAcc}>
      <Dialog.Content maxHeight="360px" maxWidth="450px">
        <Dialog.Title>Switch Account</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Choose an account to switch
        </Dialog.Description>

        <Flex direction="column" gap="4">
          {usersData.length > 0 ? (
            usersData.map((user, idx) => (
              <Flex
                className="hover:border-1 px-3 py-1.5 hover:border-gray-500 rounded-md"
                key={idx}
                direction="row"
                align="center"
                justify={"between"}
                gap="3"
              >
                <Flex
                  onClick={() => {
                    handleSwitch(user.id);
                  }}
                  direction="row"
                  align="center"
                  gap="3"
                >
                  <Avatar
                    size="3"
                    fallback={user?.name?.charAt(0).toUpperCase() || "U"}
                    radius="full"
                    src={
                      user?.avatarUrl ||
                      "https://pbs.twimg.com/profile_images/1337055608613253126/.png"
                    }
                  />
                  <Box>
                    <Heading size="3" as="h3" color="blue">
                      {user?.name || "Unknown"}
                    </Heading>
                    <Text as="div" size="2" color="gray" mb="2">
                      {user?.email || "No email found"}
                    </Text>
                  </Box>
                </Flex>
                <SwitchAccDropD id={user.id} setUsersData={setUsersData} />
              </Flex>
            ))
          ) : (
            <Text size="2" color="gray">
              No users found.
            </Text>
          )}
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
