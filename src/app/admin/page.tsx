"use client";
import {
  Card,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Center,
  Tabs,
} from "@mantine/core";
import { IconMessageCircle, IconSettings, IconUser } from "@tabler/icons-react";
import Image from "next/image";
import { useForm } from "@mantine/form";
import React, { useState } from "react";

type UserForm = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
  age: string;
};

export default function Page() {
  const [message, setMessage] = useState<string>("");

  const form = useForm<UserForm>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      phone: "",
      age: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email"),
      firstName: (value) => (value.length > 0 ? null : "Enter first name"),
      lastName: (value) => (value.length > 0 ? null : "Enter last name"),
      address: (value) => (value.length > 0 ? null : "Enter address"),
      phone: (value) => (value.length > 0 ? null : "Enter phone"),
      age: (value) => (value.length > 0 ? null : "Enter age"),
    },
  });

  const handleCreate = async (values: UserForm) => {
    try {
      const res = await fetch(`http://localhost:8080/api/users/4`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        const data = await res.json();
        setMessage(`User updated: ID ${data.id}`);
        form.reset();
      } else {
        setMessage("Failed to update user.");
      }
    } catch {
      setMessage("Error connecting to server.");
    }
  };

  return (
    <Container mt={20} fluid>
      <Tabs defaultValue="gallery">
        <Tabs.List>
          <Tabs.Tab value="gallery" leftSection={<IconUser size={12} />}>
            About You
          </Tabs.Tab>
          <Tabs.Tab
            value="messages"
            leftSection={<IconMessageCircle size={12} />}
          >
            Messages
          </Tabs.Tab>
          <Tabs.Tab value="settings" leftSection={<IconSettings size={12} />}>
            Settings
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="messages">Messages tab content</Tabs.Panel>
        <Tabs.Panel value="settings">Settings tab content</Tabs.Panel>
      </Tabs>
      <Center>
        <Card shadow="lg" padding="xl" radius="xl" withBorder w={450} h={600}>
          <Center>
            <Card.Section mb={10} mt={10}>
              <Image
                height={160}
                width={150}
                src="/images/uInfo.png"
                alt="User information"
              />
            </Card.Section>
          </Center>
          <form onSubmit={form.onSubmit(handleCreate)}>
            <Group grow>
              <TextInput
                required
                label="Name"
                {...form.getInputProps("firstName")}
                mb="md"
              />
              <TextInput
                required
                label="Last name"
                {...form.getInputProps("lastName")}
                mb="md"
              />
            </Group>
            <TextInput
              required
              label="Email"
              {...form.getInputProps("email")}
              mb="md"
            />
            <TextInput
              required
              label="Adress"
              {...form.getInputProps("address")}
              mb="md"
            />
            <Group grow>
              <TextInput
                required
                label="Phone"
                {...form.getInputProps("phone")}
                mb="md"
              />
              <TextInput
                required
                label="AGE"
                {...form.getInputProps("age")}
                mb="md"
              />
            </Group>
            <Button fullWidth mt="md" type="submit" variant="outline">
              Save
            </Button>
          </form>
          {message && (
            <Text
              c={message.startsWith("User created") ? "green" : "red"}
              mt="md"
            >
              {message}
            </Text>
          )}
        </Card>
      </Center>
    </Container>
  );
}
