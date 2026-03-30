"use client";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { label: "Hero", href: "#hero" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
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

        <Box>
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
