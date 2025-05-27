import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaSuitcase } from "react-icons/fa";
import {
  IconLayoutDashboard,
  IconLogout,
  IconSchool,
  IconUser,
} from "@tabler/icons-react";
import { Container, NavLink, rem, Stack, Text } from "@mantine/core";
import { useAuth } from "../lib/auth/AuthContext";

const links = [
  { label: "Dashboard", href: "/", icon: IconLayoutDashboard },
  { label: "About You", href: "/admin", icon: IconUser },
  { label: "Education", href: "/School", icon: IconSchool },
  { label: "Experance", href: "/customers", icon: FaSuitcase },
] as const;

export default function MainNavbar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <Container>
      <Stack gap={0}>
        {links.map(({ label, href, icon: IconComponent }) => {
          const isActive = pathname === href;

          return (
            <NavLink
              style={{
                backgroundColor: "transparent",
              }}
              key={href}
              label={
                isActive ? (
                  <Text c="blue" size="lg">
                    {label}
                  </Text>
                ) : (
                  <Text c="white" size="lg">
                    {label}
                  </Text>
                )
              }
              component={Link}
              href={href}
              active={isActive}
              leftSection={
                <IconComponent
                  size={25}
                  color={
                    isActive
                      ? "rgba(0, 123, 255, 0.8)"
                      : "rgba(255,255,255,0.7)"
                  }
                />
              }
            />
          );
        })}
      </Stack>
      <NavLink
        style={{
          bottom: 10,

          position: "absolute",
        }}
        mt="2xl"
        label="Logga ut"
        component="button"
        color="red"
        leftSection={<IconLogout style={{ width: rem(18) }} />}
        onClick={() => logout()}
      />
    </Container>
  );
}
