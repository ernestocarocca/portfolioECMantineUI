"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  TextInput,
  Button,
  Text,
  CardSection,
  Container,
  Center,
} from "@mantine/core";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebaseAuth/auth";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in successfully
        const user = userCredential.user;
        console.log("User signed in:", user);
        router.push("/admin");
      })
      .catch((error) => {
        // Handle errors during sign in
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error signing in:", errorCode, errorMessage);
        // Display error message to the user (e.g., invalid email/password, user not found)
      });
  };

  return (
    <Container size={420} my={40}>
      <Center>
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          style={{ width: 350 }}
        >
          <form onSubmit={handleSubmit}>
            <CardSection m={5}>
              <Text size="lg" fw={500} mt="md" mb="md">
                Login
              </Text>
            </CardSection>
            <TextInput
              required
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              mb="md"
            />
            <TextInput
              required
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              mb="md"
            />
            {error && (
              <Text color="red" size="sm" mb="md">
                {error}
              </Text>
            )}
            <Button fullWidth type="submit" mt="md">
              Login
            </Button>
          </form>
        </Card>
      </Center>
    </Container>
  );
}
