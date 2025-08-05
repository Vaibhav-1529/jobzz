"use client";

import { useState } from "react";
import { Button, Dialog, TextField, Flex, Text } from "@radix-ui/themes";

export default function AddCompanyModal() {
    const [open,setOpen]=useState(false)
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/company/add", {
        method: "POST",
        body: JSON.stringify({ name, description }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.success) {
        setMessage("Company added successfully!");
        setTimeout(() => {
          setOpen(false);
        }, 1000);
      } else {
        setMessage(data.message || "Invalid credentials.");
      }
    } catch (err) {
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
              <Dialog.Trigger>
        <Button>Add company</Button>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Add Company</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Enter your company details below..
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text>Company Name</Text>
            <TextField.Root
              placeholder="Company name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            <Text>Description</Text>
            <TextField.Root
              type="text"
              placeholder="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </Flex>

        {message && (
          <Text mt="2" color={message.includes("success") ? "green" : "red"}>
            {message}
          </Text>
        )}

        <Flex mt="4" justify="end" gap="2">
          <Button onClick={handleSubmit}>
            {!loading ? (
              "Add"
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <circle cx="18" cy="12" r="0" fill="currentColor">
                  <animate
                    attributeName="r"
                    begin=".67"
                    calcMode="spline"
                    dur="1.5s"
                    keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                    repeatCount="indefinite"
                    values="0;2;0;0"
                  ></animate>
                </circle>
                <circle cx="12" cy="12" r="0" fill="currentColor">
                  <animate
                    attributeName="r"
                    begin=".33"
                    calcMode="spline"
                    dur="1.5s"
                    keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                    repeatCount="indefinite"
                    values="0;2;0;0"
                  ></animate>
                </circle>
                <circle cx="6" cy="12" r="0" fill="currentColor">
                  <animate
                    attributeName="r"
                    begin="0"
                    calcMode="spline"
                    dur="1.5s"
                    keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                    repeatCount="indefinite"
                    values="0;2;0;0"
                  ></animate>
                </circle>
              </svg>
            )}
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
