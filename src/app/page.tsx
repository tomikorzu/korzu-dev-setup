"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Navbar from "@/modules/shared/components/Navbar/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <Box
        id="hero"
        sx={{
          py: 16,
          textAlign: "center",
          bgcolor: "surface.container.enabled",
        }}
      >
        <Container maxWidth="md">
          <Chip label="Open Source" color="primary" sx={{ mb: 3 }} />
          <Typography variant="h2" fontWeight={800} gutterBottom>
            Build faster with a solid foundation
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mb: 5, maxWidth: 600, mx: "auto" }}
          >
            A reusable dev setup with Next.js, MUI, and GSAP. Dark/light mode,
            token-based theming, and zero sx spaghetti.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button size="large">Get Started</Button>
            <Button variant="outlined" size="large">
              View Docs
            </Button>
          </Stack>
        </Container>
      </Box>

      <Divider />

      {/* Features */}
      <Box id="features" sx={{ py: 12, bgcolor: "surface.container.low" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            fontWeight={700}
            textAlign="center"
            gutterBottom
          >
            Features
          </Typography>
          <Typography
            color="text.secondary"
            textAlign="center"
            sx={{ mb: 6, maxWidth: 500, mx: "auto" }}
          >
            Everything you need to ship consistent, themeable apps at speed.
          </Typography>

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={3}
          >
            {[
              {
                title: "One-file rebranding",
                desc: "Change brand.ts and every button, surface, and nav color updates automatically.",
              },
              {
                title: "Dark & Light mode",
                desc: "CSS variables-based switching with zero flash. Respects device preference.",
              },
              {
                title: "Token-driven components",
                desc: "25 component overrides read semantic tokens. No sx needed for consistency.",
              },
            ].map((f) => (
              <Card key={f.title} variant="outlined" sx={{ p: 4, flex: 1 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {f.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {f.desc}
                </Typography>
              </Card>
            ))}
          </Stack>
        </Container>
      </Box>

      <Divider />

      {/* Pricing / CTA */}
      <Box id="pricing" sx={{ py: 12, bgcolor: "surface.container.enabled" }}>
        <Container maxWidth="sm" sx={{ textAlign: "center" }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Pricing
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            It&apos;s free. Fork it, brand it, ship it.
          </Typography>

          <Stack spacing={2}>
            <Alert severity="success">
              All features included — no paid tier.
            </Alert>
            <Alert severity="info">
              Contributions welcome on GitHub.
            </Alert>
          </Stack>
        </Container>
      </Box>

      <Divider />

      {/* Contact */}
      <Box id="contact" sx={{ py: 12, bgcolor: "surface.container.low" }}>
        <Container maxWidth="sm">
          <Typography
            variant="h4"
            fontWeight={700}
            textAlign="center"
            gutterBottom
          >
            Contact
          </Typography>
          <Typography
            color="text.secondary"
            textAlign="center"
            sx={{ mb: 5 }}
          >
            Questions? Reach out and we&apos;ll get back to you.
          </Typography>

          <Stack spacing={3}>
            <TextField label="Name" fullWidth />
            <TextField label="Email" type="email" fullWidth />
            <TextField label="Message" multiline rows={4} fullWidth />
            <Button size="large">Send Message</Button>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
