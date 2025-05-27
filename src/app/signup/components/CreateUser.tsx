import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";

import {
  TextInput,
  Button,
  Text,
  Card,
  CardSection,
  Center,
} from "@mantine/core";
import { auth } from "@/firebaseAuth/auth";

export default function CreateUserButton() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("Error creating user: " + err.message);
      } else {
        setError("Error creating user: Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Center>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        style={{ width: 350 }}
      >
        <CardSection>
          <Text size="lg" fw={500} mt="md" mb="md">
            Create Account
          </Text>
        </CardSection>
        <form onSubmit={handleCreateUser}>
          <TextInput
            disabled={loading}
            label="Email"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            mb="md"
            required
          />
          <TextInput
            disabled={loading}
            label="Password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            mb="md"
            required
          />
          {error && (
            <Text c="red" size="sm" mb="md">
              {error}
            </Text>
          )}
          {success && (
            <Text c="green" size="sm" mb="md">
              User created!
            </Text>
          )}
          <Button type="submit" fullWidth loading={loading} mt="md">
            Create User
          </Button>
        </form>
      </Card>
    </Center>
  );
}
