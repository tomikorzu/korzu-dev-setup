"use client";

import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useCommandPaletteShortcut } from "../../hooks/useCommandPaletteShortcut";
import { useCommandPaletteStore } from "../../stores/commandPalette.store";
import CommandPalette, {
  type CommandItem,
} from "../CommandPalette/CommandPalette.component";
import ThemeToggle from "./ThemeToggle.component";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Components", href: "/components" },
];

export default function Navbar() {
  const router = useRouter();
  const { open, openPalette, closePalette } = useCommandPaletteStore();
  useCommandPaletteShortcut();

  const commands: CommandItem[] = NAV_LINKS.map((link) => ({
    id: link.href,
    label: `Go to ${link.label}`,
    group: "Navigation",
  }));

  const handleSelect = (command: CommandItem) => {
    router.push(command.id);
    closePalette();
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" fontWeight={700} sx={{ mr: 4 }}>
          Korzu
        </Typography>

        <Stack direction="row" spacing={1} sx={{ flexGrow: 1 }}>
          {NAV_LINKS.map((link) => (
            <Button key={link.href} variant="nav" href={link.href} size="small">
              {link.label}
            </Button>
          ))}
        </Stack>

        <IconButton onClick={openPalette} size="small" sx={{ mr: 1 }}>
          <SearchIcon fontSize="small" />
        </IconButton>
        <ThemeToggle />

        <CommandPalette
          open={open}
          onClose={closePalette}
          commands={commands}
          onSelect={handleSelect}
          placeholder="Search or jump to a page…"
        />
      </Toolbar>
    </AppBar>
  );
}
