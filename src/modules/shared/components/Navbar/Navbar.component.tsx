"use client";

import { AppBar, Toolbar, Typography, Button, Stack } from "@mui/material";
import ThemeToggle from "./ThemeToggle.component";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Components", href: "/components" },
];

export default function Navbar() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" fontWeight={700} sx={{ mr: 4 }}>
          Korzu
        </Typography>

        <Stack direction="row" spacing={1} sx={{ flexGrow: 1 }}>
          {NAV_LINKS.map((link) => (
            <Button
              key={link.href}
              variant="nav"
              href={link.href}
              size="small"
            >
              {link.label}
            </Button>
          ))}
        </Stack>

        <ThemeToggle />
      </Toolbar>
    </AppBar>
  );
}
