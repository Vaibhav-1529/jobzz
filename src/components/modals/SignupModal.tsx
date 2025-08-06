"use client";

import { useContext, useState } from "react";
import {
  Button,
  Dialog,
  TextField,
  Flex,
  Text,
  Select,
} from "@radix-ui/themes";
import { UserContext } from "@/app/(group)/layout";

export default function SignupModal({
  signUpOpen,
  setOpen,
  setSignUpOpen,
}: {
  signUpOpen: boolean;
  setOpen: Function;
  setSignUpOpen: Function;
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const {setUser} = useContext(UserContext)
  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({ name,email, password,role }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.success) {
        setUser(data.user)
        setMessage("Login successful!");
        setSignUpOpen(false);
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
    <Dialog.Root open={signUpOpen} onOpenChange={setSignUpOpen}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Signup</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Enter your credentials below
        </Dialog.Description>
        <Flex direction="column" gap="3">
          <label>
            <Text>Name</Text>
            <TextField.Root
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            <Text>Email</Text>
            <TextField.Root
            value={email}
              placeholder="xyz@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <Text>Password</Text>
            <TextField.Root
              type="password"
              value={password}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label>
            <Flex gap="6">

            <Text>Role</Text>
            <Select.Root  value={role} onValueChange={setRole}>
              <Select.Trigger style={{width:"180px"}} />
              <Select.Content >
                <Select.Item value="user">User</Select.Item>
                <Select.Item value="admin">Admin</Select.Item>
              </Select.Content>
            </Select.Root>
            </Flex>
          </label>
        </Flex>
        <Flex mt="2" justify="end" style={{padding:"10px 0px"}} position={"relative"} align={"center"} gap="8">
        {message && <Text style={{margin:"30px",position:"absolute",
            top:"-15px",
            left:"0"
        }} color="red">{message}</Text>}
          <Button onClick={handleSubmit}>
            {!loading ? (
              "Signup"
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
        <Text
          color="blue"
          onClick={() => {
            setSignUpOpen(false);
            setOpen(true);
          }}
          className="cursor-pointer hover:underline"
        >
          Already have an account?
        </Text>
      </Dialog.Content>
    </Dialog.Root>
  );
}
