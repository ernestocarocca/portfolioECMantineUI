"use client";

import { ReactNode } from "react";
import {
  AppShell,
  Burger,
  Divider,
  Loader,
  MantineProvider,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Notifications } from "@mantine/notifications";

import styles from "./components/MainNavbar.module.css";

import "@mantine/notifications/styles.css";
import theme from "@/app/theme";
import { useAuth } from "@/lib/auth/AuthContext";
import MainHeader from "@/components/MainHeader";
import MainNavbar from "@/components/MainNavbar";

export default function ClientRoot({ children }: { children: ReactNode }) {
  const [mobileOpened, { toggle }] = useDisclosure();
  const { token, ready } = useAuth();

  if (!ready) {
    return (
      <div
        style={{
          display: "grid",
          placeItems: "center",
          height: "100vh",
          backgroundColor: "blue",
          flexDirection: "column",
          margin: 0,
          padding: 0,
        }}
      >
        <Loader />
      </div>
    );
  }

  return (
    <MantineProvider theme={theme} defaultColorScheme="light" withCssVariables>
      <Notifications />
      {token ? (
        <AppShell
          header={{ height: 60 }}
          navbar={{
            width: 260,
            breakpoint: "sm",
            collapsed: { mobile: !mobileOpened },
          }}
          padding="md"
        >
          {/* ---------- Header ---------- */}
          <AppShell.Header>
            <MainHeader
              burger={
                <Burger
                  opened={mobileOpened}
                  onClick={toggle}
                  hiddenFrom="sm"
                  size="sm"
                  mr="md"
                />
              }
            />
          </AppShell.Header>

          {/* ---------- Navbar ---------- */}
          <AppShell.Navbar bg="black" p="xs">
            <Text
              className={styles.logoText}
              ta="center"
              fw={900}
              c="white"
              size="xl"
              mb="md"
              p={2}
            >
              Admin Portfolio
            </Text>
            <Divider mb="xs" color="rgba(255,255,255,0.2)" />
            <MainNavbar />
          </AppShell.Navbar>

          {/* ---------- Main content ---------- */}
          <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
      ) : (
        <AppShell header={{ height: 60 }} padding="md">
          {/* ---------- Header ---------- */}
          <AppShell.Header>
            <MainHeader
              burger={
                <Burger
                  opened={mobileOpened}
                  onClick={toggle}
                  hiddenFrom="sm"
                  size="sm"
                  mr="md"
                />
              }
            />
          </AppShell.Header>

          {/* ---------- Main content ---------- */}
          <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
      )}
    </MantineProvider>
  );
}
