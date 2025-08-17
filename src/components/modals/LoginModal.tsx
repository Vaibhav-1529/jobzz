"use client";

import { useContext, useState } from "react";
import { Button, Dialog, TextField, Flex, Text } from "@radix-ui/themes";
import { UserContext } from "@/app/(group)/layout";
import BtnLoading from "../lodingstate/BtnLoading";

export default function LoginModal({
  open,
  setOpen,
  setSignUpOpen,
}: {
  open: boolean;
  setOpen: Function;
  setSignUpOpen: Function;
})
 {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const {setUser}=useContext(UserContext)
  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.success) {
        setMessage("Login successful!");
        setUser(data.user)
        setTimeout(() => {
          setOpen(false);
        }, 800);
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
        <Button>Login</Button>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Login</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Enter your credentials below
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text>Email</Text>
            <TextField.Root
              placeholder="xyz@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <Text>Password</Text>
            <TextField.Root
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
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
              "Login"
            ) : (
             <BtnLoading/>
            )}
          </Button>
        </Flex>
            <Text color="blue" onClick={() => {
  setOpen(false);
  setSignUpOpen(true);
}} className="cursor-pointer hover:underline">
  Create a new account
</Text>

      </Dialog.Content>
    </Dialog.Root>
  );
}
