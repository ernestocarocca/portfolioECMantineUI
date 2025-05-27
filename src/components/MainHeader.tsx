import { IconBell, IconMoon, IconSun } from "@tabler/icons-react";
import {
  ActionIcon,
  Group,
  rem,
  Title,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";

interface Props {
  burger: React.ReactNode;
}

export default function MainHeader({ burger }: Props) {
  const { setColorScheme } = useMantineColorScheme();
  const scheme = useComputedColorScheme("light");

  return (
    <Group
      bg="black"
      justify="space-between"
      px="md"
      style={{ height: "100%" }}
    >
      <Group gap="md">
        {burger}
        <div>
          <Title c="white" order={3}>
            Welcome to Ernestos Portfolio
          </Title>
        </div>
      </Group>

      <Group gap="xs">
        <ActionIcon
          size="lg"
          variant="default"
          aria-label="Toggle theme"
          onClick={() => setColorScheme(scheme === "dark" ? "light" : "dark")}
        >
          <IconSun
            style={{ width: rem(18) }}
            className="mantine-light-hidden"
          />
          <IconMoon
            style={{ width: rem(18) }}
            className="mantine-dark-hidden"
          />
        </ActionIcon>

        <ActionIcon size="lg" variant="outline" aria-label="Notifikationer">
          <IconBell style={{ width: rem(18) }} />
        </ActionIcon>
      </Group>
    </Group>
  );
}
