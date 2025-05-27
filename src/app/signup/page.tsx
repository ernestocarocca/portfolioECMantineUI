"use client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebaseAuth/auth";
import { useState } from "react";
import { Button, Card, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length >= 4 ? null : "Password too short"),
    },
  });
  const handleCreateUser = async (values: typeof form.values) => {
    setLoading(true);
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
    } catch {
      setError("Error creating user: ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex justify-center items-center max-w-screen-xl max-h-screen-xl  mt-6 ">
      <Card
        className="p-1 border-1 border-white w-[300px] h-[500px] m-2 "
        radius="lg"
      >
        <Text fw={500}>Signup</Text>

        <form onSubmit={form.onSubmit(handleCreateUser)}>
          <div className="mb-3">
            <TextInput
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              key={form.key("email")}
              {...form.getInputProps("email")}
            />
          </div>

          <TextInput
            error={error}
            required
            className="mb-3"
            type="password"
            name="password"
            placeholder="********"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          {error && (
            <Text c="red" size="sm" mb="md">
              {error}
            </Text>
          )}
          <div className=" flex justify-center ">
            <Button
              disabled={loading}
              className="button-0"
              type="submit"
              variant="ghost"
            >
              Create User
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
