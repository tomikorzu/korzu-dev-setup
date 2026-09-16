"use client";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DevicesIcon from "@mui/icons-material/Devices";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import GridViewIcon from "@mui/icons-material/GridView";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import MuiDivider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Accordion from "@/modules/shared/components/Accordion/Accordion.component";
// ── Original components ────────────────────────────
import AsideMenu from "@/modules/shared/components/AsideMenu/AsideMenu";
import AvatarGroup from "@/modules/shared/components/AvatarGroup/AvatarGroup";
// ── New variant components ─────────────────────────
import Badge from "@/modules/shared/components/Badge/Badge.component";
import Banner from "@/modules/shared/components/Banner/Banner.component";
import Breadcrumbs from "@/modules/shared/components/Breadcrumbs/Breadcrumbs.component";
import Carousel from "@/modules/shared/components/Carousel/Carousel";
import ChatInput from "@/modules/shared/components/ChatInput/ChatInput";
import ChatThread from "@/modules/shared/components/ChatThread/ChatThread";
import CodeBlock from "@/modules/shared/components/CodeBlock/CodeBlock.component";
import CommandPalette from "@/modules/shared/components/CommandPalette/CommandPalette.component";
import ConfirmDialog from "@/modules/shared/components/ConfirmDialog/ConfirmDialog";
import type { DataTableColumn } from "@/modules/shared/components/DataTable/DataTable";
import DataTable from "@/modules/shared/components/DataTable/DataTable";
import Divider from "@/modules/shared/components/Divider/Divider.component";
import DropdownMenu from "@/modules/shared/components/DropdownMenu/DropdownMenu.component";
import EmptyState from "@/modules/shared/components/EmptyState/EmptyState.component";
import FileUpload from "@/modules/shared/components/FileUpload/FileUpload.component";
import InfoDrawer from "@/modules/shared/components/InfoDrawer/InfoDrawer";
import KBD from "@/modules/shared/components/KBD/KBD.component";
import MetricBar from "@/modules/shared/components/MetricBar/MetricBar.component";
import NotificationCard from "@/modules/shared/components/NotificationCard/NotificationCard.component";
import Pagination from "@/modules/shared/components/Pagination/Pagination";
import PasswordInput from "@/modules/shared/components/PasswordInput/PasswordInput.component";
import PricingCard from "@/modules/shared/components/PricingCard/PricingCard.component";
import ProgressBar from "@/modules/shared/components/ProgressBar/ProgressBar.component";
import Rating from "@/modules/shared/components/Rating/Rating.component";
import SearchInput from "@/modules/shared/components/SearchInput/SearchInput";
import SectionHeading from "@/modules/shared/components/SectionHeading/SectionHeading";
import StatCard from "@/modules/shared/components/StatCard/StatCard";
import StatusDot from "@/modules/shared/components/StatusDot/StatusDot.component";
import Stepper from "@/modules/shared/components/Stepper/Stepper.component";
import TabGroup from "@/modules/shared/components/TabGroup/TabGroup.component";
import TagInput from "@/modules/shared/components/TagInput/TagInput";
import Timeline from "@/modules/shared/components/Timeline/Timeline";
import Toast from "@/modules/shared/components/Toast/Toast";
import ToggleGroup from "@/modules/shared/components/ToggleGroup/ToggleGroup.component";
import UserCard from "@/modules/shared/components/UserCard/UserCard.component";
import { SHOWCASE_SECTIONS } from "@/modules/shared/constants/showcase";
// ── Hooks & constants ──────────────────────────────
import { useActiveSection } from "@/modules/shared/hooks/useActiveSection";

import {
  CAROUSEL_SLIDES,
  MOCK_ACCORDION_ITEMS,
  MOCK_AVATARS,
  MOCK_BREADCRUMBS,
  MOCK_COMMANDS,
  MOCK_DROPDOWN_ITEMS,
  MOCK_MESSAGES,
  MOCK_NOTIFICATIONS,
  MOCK_PRICING_PLANS,
  MOCK_STATS,
  MOCK_STEPPER_STEPS,
  MOCK_TIMELINE,
  MOCK_USERS,
  type MockUser,
} from "./showcase.constants";

// ── Static data ────────────────────────────────────

const STAT_ICONS = [
  <PeopleOutlineIcon key="p" fontSize="small" />,
  <AttachMoneyIcon key="a" fontSize="small" />,
  <DevicesIcon key="d" fontSize="small" />,
  <ShowChartIcon key="s" fontSize="small" />,
];

const TABLE_COLUMNS: DataTableColumn<MockUser>[] = [
  { key: "name", label: "Name", sortable: true },
  { key: "email", label: "Email", sortable: true },
  { key: "role", label: "Role", sortable: true },
  {
    key: "status",
    label: "Status",
    render: (value) => {
      const colorMap: Record<string, "success" | "error" | "warning"> = {
        active: "success",
        inactive: "error",
        pending: "warning",
      };
      return (
        <Chip
          label={String(value)}
          color={colorMap[String(value)] ?? "default"}
          size="small"
        />
      );
    },
  },
  { key: "joined", label: "Joined", sortable: true },
];

const SAMPLE_CODE = `import { useTheme } from "@mui/material/styles";

export function MyComponent() {
  const theme = useTheme();

  return (
    <Box sx={{
      bgcolor: "surface.container.low",
      color: "text.primary",
      borderRadius: 3,
      p: 4,
    }}>
      Hello, tokens!
    </Box>
  );
}`;

const sectionIds = SHOWCASE_SECTIONS.map((s) => s.id);

// ── Reusable demo wrapper ──────────────────────────

function DemoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card variant="outlined" sx={{ p: 5 }}>
      <Typography variant="subtitle2" sx={{ mb: 3 }}>
        {title}
      </Typography>
      {children}
    </Card>
  );
}

// ── Main showcase ──────────────────────────────────

export default function ComponentShowcase() {
  const activeSection = useActiveSection(sectionIds);

  // Pagination
  const [page, setPage] = useState(1);
  const [compactPage, setCompactPage] = useState(1);

  // Table
  const [tablePage, setTablePage] = useState(1);
  const [sortCol, setSortCol] = useState<string>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  // Feedback
  const [dialogOpen, setDialogOpen] = useState(false);
  const [destructiveDialogOpen, setDestructiveDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toastSeverity, setToastSeverity] = useState<
    "success" | "error" | "warning" | "info" | null
  >(null);

  // Chat
  const [chatMessages, setChatMessages] = useState(MOCK_MESSAGES);
  const [chatInput, setChatInput] = useState("");

  // Inputs
  const [searchValue, setSearchValue] = useState("");
  const [tags, setTags] = useState(["React", "MUI", "Next.js"]);
  const [passwordValue, setPasswordValue] = useState("");

  // Rating
  const [ratingValue, setRatingValue] = useState(3);

  // Stepper
  const [activeStep, setActiveStep] = useState(1);

  // Toggle group
  const [toggleValue, setToggleValue] = useState<string | string[]>("list");
  const [formatValue, setFormatValue] = useState<string | string[]>(["bold"]);

  // Command palette
  const [commandOpen, setCommandOpen] = useState(false);

  // File upload
  const [uploadedFiles, setUploadedFiles] = useState<
    { name: string; size: number; progress?: number }[]
  >([]);

  // ── Handlers ─────────────────────────────────────

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        message: chatInput.trim(),
        variant: "sent",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "sending",
      },
    ]);
    setChatInput("");
  };

  const sortedUsers = [...MOCK_USERS].sort((a, b) => {
    const aVal = String(a[sortCol as keyof MockUser] ?? "");
    const bVal = String(b[sortCol as keyof MockUser] ?? "");
    return sortDir === "asc"
      ? aVal.localeCompare(bVal)
      : bVal.localeCompare(aVal);
  });

  return (
    <>
      <Stack direction="row">
        <AsideMenu
          items={SHOWCASE_SECTIONS.map((s) => ({
            id: s.id,
            label: s.label,
          }))}
          activeId={activeSection}
        />

        <Box component="main" sx={{ flex: 1, minWidth: 0 }}>
          <Container maxWidth="lg" sx={{ py: 8 }}>
            {/* ════════════════════════════════════════════
                § NAVIGATION & LAYOUT
               ════════════════════════════════════════════ */}
            <SectionHeading
              id="navigation"
              title="Navigation & Layout"
              subtitle="Components for navigation, wayfinding, and page structure."
            />

            <Stack spacing={6} sx={{ mb: 12 }}>
              <DemoCard title="Breadcrumbs">
                <Breadcrumbs items={MOCK_BREADCRUMBS} maxItems={1} />
              </DemoCard>

              <DemoCard title="Pagination — Numbered">
                <Pagination
                  page={page}
                  totalPages={10}
                  onPageChange={setPage}
                />
                <MuiDivider sx={{ my: 4 }} />
                <Typography variant="subtitle2" sx={{ mb: 3 }}>
                  Pagination — Compact
                </Typography>
                <Pagination
                  page={compactPage}
                  totalPages={10}
                  onPageChange={setCompactPage}
                  variant="compact"
                />
              </DemoCard>

              <DemoCard title="Stepper — Horizontal">
                <Stepper
                  steps={MOCK_STEPPER_STEPS}
                  activeStep={activeStep}
                  variant="horizontal"
                  onStepClick={setActiveStep}
                />
                <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep((s) => s - 1)}
                  >
                    Back
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    disabled={activeStep === MOCK_STEPPER_STEPS.length}
                    onClick={() => setActiveStep((s) => s + 1)}
                  >
                    Next
                  </Button>
                </Stack>
                <MuiDivider sx={{ my: 4 }} />
                <Typography variant="subtitle2" sx={{ mb: 3 }}>
                  Stepper — Vertical
                </Typography>
                <Stepper
                  steps={MOCK_STEPPER_STEPS}
                  activeStep={2}
                  variant="vertical"
                  color="success"
                />
                <MuiDivider sx={{ my: 4 }} />
                <Typography variant="subtitle2" sx={{ mb: 3 }}>
                  Stepper — Minimal
                </Typography>
                <Stepper
                  steps={MOCK_STEPPER_STEPS}
                  activeStep={activeStep}
                  variant="minimal"
                />
              </DemoCard>

              <DemoCard title="TabGroup Variants">
                <Typography
                  variant="caption"
                  color="text.tertiary"
                  sx={{ mb: 2, display: "block" }}
                >
                  Underline
                </Typography>
                <TabGroup
                  tabs={[
                    {
                      id: "overview",
                      label: "Overview",
                      content: (
                        <Typography variant="body2" color="text.secondary">
                          Overview content goes here.
                        </Typography>
                      ),
                    },
                    {
                      id: "analytics",
                      label: "Analytics",
                      content: (
                        <Typography variant="body2" color="text.secondary">
                          Analytics dashboard content.
                        </Typography>
                      ),
                    },
                    {
                      id: "settings",
                      label: "Settings",
                      content: (
                        <Typography variant="body2" color="text.secondary">
                          Settings panel content.
                        </Typography>
                      ),
                    },
                  ]}
                  variant="underline"
                />
                <MuiDivider sx={{ my: 4 }} />
                <Typography
                  variant="caption"
                  color="text.tertiary"
                  sx={{ mb: 2, display: "block" }}
                >
                  Pills
                </Typography>
                <TabGroup
                  tabs={[
                    {
                      id: "all",
                      label: "All",
                      content: (
                        <Typography variant="body2" color="text.secondary">
                          Showing all items.
                        </Typography>
                      ),
                    },
                    {
                      id: "active",
                      label: "Active",
                      content: (
                        <Typography variant="body2" color="text.secondary">
                          Showing active items.
                        </Typography>
                      ),
                    },
                    {
                      id: "archived",
                      label: "Archived",
                      content: (
                        <Typography variant="body2" color="text.secondary">
                          Showing archived items.
                        </Typography>
                      ),
                    },
                  ]}
                  variant="pills"
                />
                <MuiDivider sx={{ my: 4 }} />
                <Typography
                  variant="caption"
                  color="text.tertiary"
                  sx={{ mb: 2, display: "block" }}
                >
                  Contained
                </Typography>
                <TabGroup
                  tabs={[
                    {
                      id: "day",
                      label: "Day",
                      content: (
                        <Typography variant="body2" color="text.secondary">
                          Day view.
                        </Typography>
                      ),
                    },
                    {
                      id: "week",
                      label: "Week",
                      content: (
                        <Typography variant="body2" color="text.secondary">
                          Week view.
                        </Typography>
                      ),
                    },
                    {
                      id: "month",
                      label: "Month",
                      content: (
                        <Typography variant="body2" color="text.secondary">
                          Month view.
                        </Typography>
                      ),
                    },
                  ]}
                  variant="contained"
                />
              </DemoCard>
            </Stack>

            {/* ════════════════════════════════════════════
                § DATA DISPLAY
               ════════════════════════════════════════════ */}
            <SectionHeading
              id="data-display"
              title="Data Display"
              subtitle="Components for presenting data, metrics, and activity."
            />

            <Stack spacing={6} sx={{ mb: 12 }}>
              {/* Stat Cards */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
                {MOCK_STATS.map((stat, i) => (
                  <Box key={stat.title} sx={{ flex: 1 }}>
                    <StatCard
                      {...stat}
                      icon={STAT_ICONS[i]}
                      variant={i % 2 === 0 ? "default" : "outlined"}
                    />
                  </Box>
                ))}
              </Stack>

              {/* Data Table */}
              <DemoCard title="DataTable">
                <DataTable
                  columns={TABLE_COLUMNS}
                  rows={sortedUsers}
                  getRowId={(row) => row.id}
                  selectable
                  sortColumn={sortCol}
                  sortDirection={sortDir}
                  onSort={(col, dir) => {
                    setSortCol(col);
                    setSortDir(dir);
                  }}
                  pagination={{
                    page: tablePage,
                    pageSize: 5,
                    total: MOCK_USERS.length,
                    onPageChange: setTablePage,
                  }}
                />
              </DemoCard>

              {/* Timeline */}
              <DemoCard title="Timeline">
                <Timeline items={MOCK_TIMELINE} />
              </DemoCard>

              {/* Avatar Group */}
              <DemoCard title="AvatarGroup">
                <Stack direction="row" spacing={6} alignItems="center">
                  {(["small", "medium", "large"] as const).map((sz) => (
                    <Box key={sz}>
                      <Typography
                        variant="caption"
                        color="text.tertiary"
                        sx={{ mb: 1 }}
                      >
                        {sz}
                      </Typography>
                      <AvatarGroup avatars={MOCK_AVATARS} max={4} size={sz} />
                    </Box>
                  ))}
                </Stack>
              </DemoCard>

              {/* MetricBar */}
              <DemoCard title="MetricBar">
                <Stack spacing={3}>
                  <MetricBar label="CPU Usage" value={72} color="primary" />
                  <MetricBar
                    label="Memory"
                    value={45}
                    color="success"
                    variant="striped"
                  />
                  <MetricBar
                    label="Storage"
                    value={89}
                    color="error"
                    variant="segmented"
                  />
                  <MetricBar
                    label="Traffic Sources"
                    value={100}
                    variant="stacked"
                    segments={[
                      {
                        value: 45,
                        color: "brand.primary.enabled",
                        label: "Direct",
                      },
                      {
                        value: 30,
                        color: "states.positive.primary",
                        label: "Organic",
                      },
                      {
                        value: 25,
                        color: "states.caution.primary",
                        label: "Referral",
                      },
                    ]}
                  />
                </Stack>
              </DemoCard>

              {/* Accordion */}
              <DemoCard title="Accordion — Default">
                <Accordion
                  items={MOCK_ACCORDION_ITEMS.map((item) => ({
                    ...item,
                    content: (
                      <Typography variant="body2" color="text.secondary">
                        {item.content}
                      </Typography>
                    ),
                  }))}
                />
                <MuiDivider sx={{ my: 4 }} />
                <Typography variant="subtitle2" sx={{ mb: 3 }}>
                  Accordion — Separated
                </Typography>
                <Accordion
                  variant="separated"
                  multiple
                  items={MOCK_ACCORDION_ITEMS.slice(0, 3).map((item) => ({
                    ...item,
                    content: (
                      <Typography variant="body2" color="text.secondary">
                        {item.content}
                      </Typography>
                    ),
                  }))}
                />
              </DemoCard>
            </Stack>

            {/* ════════════════════════════════════════════
                § FEEDBACK & OVERLAYS
               ════════════════════════════════════════════ */}
            <SectionHeading
              id="feedback"
              title="Feedback & Overlays"
              subtitle="Dialogs, drawers, toasts, and empty states for user interaction."
            />

            <Stack spacing={6} sx={{ mb: 12 }}>
              {/* Banner */}
              <DemoCard title="Banner">
                <Stack spacing={2}>
                  <Banner
                    message="New version available. Update to get the latest features."
                    severity="info"
                    variant="subtle"
                  />
                  <Banner
                    message="Your changes have been saved successfully."
                    severity="success"
                    variant="filled"
                    dismissible
                  />
                  <Banner
                    message="Your API key will expire in 3 days."
                    severity="warning"
                    variant="outlined"
                    action={{ label: "Renew", onClick: () => {} }}
                  />
                  <Banner
                    message="Unable to connect to the server. Check your connection."
                    severity="error"
                    variant="subtle"
                    dismissible
                  />
                </Stack>
              </DemoCard>

              {/* Dialogs */}
              <DemoCard title="ConfirmDialog">
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="outlined"
                    onClick={() => setDialogOpen(true)}
                  >
                    Open Confirm
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => setDestructiveDialogOpen(true)}
                  >
                    Open Destructive
                  </Button>
                </Stack>
                <ConfirmDialog
                  open={dialogOpen}
                  onClose={() => setDialogOpen(false)}
                  onConfirm={() => setDialogOpen(false)}
                  title="Confirm Action"
                  message="Are you sure you want to proceed? This action can be undone later."
                />
                <ConfirmDialog
                  open={destructiveDialogOpen}
                  onClose={() => setDestructiveDialogOpen(false)}
                  onConfirm={() => setDestructiveDialogOpen(false)}
                  title="Delete Item"
                  message="This will permanently delete the item. This action cannot be undone."
                  severity="destructive"
                  confirmLabel="Delete"
                />
              </DemoCard>

              {/* Drawer */}
              <DemoCard title="InfoDrawer">
                <Button variant="outlined" onClick={() => setDrawerOpen(true)}>
                  Open Drawer
                </Button>
                <InfoDrawer
                  open={drawerOpen}
                  onClose={() => setDrawerOpen(false)}
                  title="User Details"
                >
                  <Stack spacing={3}>
                    <Box>
                      <Typography variant="caption" color="text.tertiary">
                        Name
                      </Typography>
                      <Typography>Alice Johnson</Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.tertiary">
                        Email
                      </Typography>
                      <Typography>alice@acme.com</Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.tertiary">
                        Role
                      </Typography>
                      <Typography>Admin</Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.tertiary">
                        Status
                      </Typography>
                      <Chip label="Active" color="success" size="small" />
                    </Box>
                  </Stack>
                </InfoDrawer>
              </DemoCard>

              {/* Toast */}
              <DemoCard title="Toast">
                <Stack direction="row" spacing={2} flexWrap="wrap">
                  {(["success", "error", "warning", "info"] as const).map(
                    (sev) => (
                      <Button
                        key={sev}
                        variant="outlined"
                        size="small"
                        onClick={() => setToastSeverity(sev)}
                      >
                        {sev}
                      </Button>
                    ),
                  )}
                </Stack>
                <Toast
                  open={toastSeverity !== null}
                  onClose={() => setToastSeverity(null)}
                  message={`This is a ${toastSeverity} notification.`}
                  severity={toastSeverity ?? "info"}
                />
              </DemoCard>

              {/* Empty State */}
              <DemoCard title="EmptyState">
                <EmptyState
                  title="No results found"
                  description="Try adjusting your search or filters to find what you're looking for."
                  action={{ label: "Clear filters", onClick: () => {} }}
                />
              </DemoCard>

              {/* Progress Bar */}
              <DemoCard title="ProgressBar">
                <Stack spacing={3}>
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.tertiary"
                      sx={{ mb: 1 }}
                    >
                      Linear
                    </Typography>
                    <ProgressBar value={65} showLabel color="primary" />
                  </Box>
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.tertiary"
                      sx={{ mb: 1 }}
                    >
                      Gradient
                    </Typography>
                    <ProgressBar
                      value={80}
                      variant="gradient"
                      showLabel
                      color="success"
                    />
                  </Box>
                  <Stack direction="row" spacing={4} alignItems="center">
                    <Box>
                      <Typography
                        variant="caption"
                        color="text.tertiary"
                        sx={{ mb: 1 }}
                      >
                        Circular
                      </Typography>
                      <ProgressBar
                        value={42}
                        variant="circular"
                        showLabel
                        size="medium"
                      />
                    </Box>
                    <Box>
                      <Typography
                        variant="caption"
                        color="text.tertiary"
                        sx={{ mb: 1 }}
                      >
                        Circular (large)
                      </Typography>
                      <ProgressBar
                        value={88}
                        variant="circular"
                        showLabel
                        size="large"
                        color="error"
                      />
                    </Box>
                  </Stack>
                </Stack>
              </DemoCard>
            </Stack>

            {/* ════════════════════════════════════════════
                § CHAT
               ════════════════════════════════════════════ */}
            <SectionHeading
              id="chat"
              title="Chat"
              subtitle="Composable chat components for messaging interfaces."
            />

            <Stack spacing={6} sx={{ mb: 12 }}>
              <Card
                variant="outlined"
                sx={{
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    px: 4,
                    py: 3,
                    borderBottom: 1,
                    borderColor: "border.neutral.tertiary",
                  }}
                >
                  <Typography variant="subtitle2">Chat Demo</Typography>
                </Box>
                <ChatThread messages={chatMessages} maxHeight={350} />
                <Box
                  sx={{
                    p: 3,
                    borderTop: 1,
                    borderColor: "border.neutral.tertiary",
                  }}
                >
                  <ChatInput
                    value={chatInput}
                    onChange={setChatInput}
                    onSend={handleSendMessage}
                  />
                </Box>
              </Card>
            </Stack>

            {/* ════════════════════════════════════════════
                § INPUTS & CONTROLS
               ════════════════════════════════════════════ */}
            <SectionHeading
              id="inputs"
              title="Inputs & Controls"
              subtitle="Specialized input components for search, tags, and content browsing."
            />

            <Stack spacing={6} sx={{ mb: 12 }}>
              <DemoCard title="SearchInput">
                <SearchInput
                  value={searchValue}
                  onChange={setSearchValue}
                  placeholder="Search components..."
                  fullWidth
                />
                {searchValue && (
                  <Typography
                    variant="caption"
                    color="text.tertiary"
                    sx={{ mt: 2 }}
                  >
                    Debounced value: &quot;{searchValue}&quot;
                  </Typography>
                )}
              </DemoCard>

              <DemoCard title="TagInput">
                <TagInput
                  tags={tags}
                  onChange={setTags}
                  placeholder="Add a tag..."
                  max={8}
                  fullWidth
                />
              </DemoCard>

              <DemoCard title="PasswordInput">
                <Stack spacing={4} sx={{ maxWidth: 400 }}>
                  <PasswordInput
                    value={passwordValue}
                    onChange={setPasswordValue}
                    variant="withStrength"
                    label="Password with strength"
                  />
                  <PasswordInput
                    value={passwordValue}
                    onChange={setPasswordValue}
                    variant="withRequirements"
                    label="Password with requirements"
                  />
                </Stack>
              </DemoCard>

              <DemoCard title="ToggleGroup">
                <Stack spacing={3}>
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.tertiary"
                      sx={{ mb: 1.5, display: "block" }}
                    >
                      View switcher (default)
                    </Typography>
                    <ToggleGroup
                      options={[
                        {
                          id: "list",
                          label: "List",
                          icon: <ViewListIcon sx={{ fontSize: 18 }} />,
                        },
                        {
                          id: "grid",
                          label: "Grid",
                          icon: <ViewModuleIcon sx={{ fontSize: 18 }} />,
                        },
                        {
                          id: "board",
                          label: "Board",
                          icon: <GridViewIcon sx={{ fontSize: 18 }} />,
                        },
                      ]}
                      value={toggleValue}
                      onChange={setToggleValue}
                    />
                  </Box>
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.tertiary"
                      sx={{ mb: 1.5, display: "block" }}
                    >
                      Text formatting (pills, multiple)
                    </Typography>
                    <ToggleGroup
                      variant="pills"
                      multiple
                      options={[
                        {
                          id: "bold",
                          label: "B",
                          icon: <FormatBoldIcon sx={{ fontSize: 18 }} />,
                        },
                        {
                          id: "italic",
                          label: "I",
                          icon: <FormatItalicIcon sx={{ fontSize: 18 }} />,
                        },
                        {
                          id: "underline",
                          label: "U",
                          icon: <FormatUnderlinedIcon sx={{ fontSize: 18 }} />,
                        },
                      ]}
                      value={formatValue}
                      onChange={setFormatValue}
                    />
                  </Box>
                </Stack>
              </DemoCard>

              <DemoCard title="Rating">
                <Stack spacing={3}>
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.tertiary"
                      sx={{ mb: 1, display: "block" }}
                    >
                      Interactive stars
                    </Typography>
                    <Rating
                      value={ratingValue}
                      onChange={setRatingValue}
                      showLabel
                      size="large"
                    />
                  </Box>
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.tertiary"
                      sx={{ mb: 1, display: "block" }}
                    >
                      Read-only half stars
                    </Typography>
                    <Rating value={3.5} readOnly showLabel />
                  </Box>
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.tertiary"
                      sx={{ mb: 1, display: "block" }}
                    >
                      Hearts variant
                    </Typography>
                    <Rating
                      value={4}
                      variant="hearts"
                      color="error"
                      readOnly
                      showLabel
                    />
                  </Box>
                </Stack>
              </DemoCard>

              <DemoCard title="FileUpload — Dropzone">
                <FileUpload
                  variant="dropzone"
                  accept="image/*,.pdf"
                  multiple
                  onFilesSelected={(files) =>
                    setUploadedFiles((prev) => [
                      ...prev,
                      ...files.map((f) => ({
                        name: f.name,
                        size: f.size,
                        progress: 100,
                      })),
                    ])
                  }
                  onFileRemove={(index) =>
                    setUploadedFiles((prev) =>
                      prev.filter((_, i) => i !== index),
                    )
                  }
                  files={uploadedFiles}
                />
              </DemoCard>

              <DemoCard title="Carousel">
                <Carousel autoPlay showDots showArrows>
                  {CAROUSEL_SLIDES.map((slide) => (
                    <Box
                      key={slide.title}
                      sx={{
                        bgcolor: "surface.container.high",
                        borderRadius: 3,
                        p: 8,
                        textAlign: "center",
                        minHeight: 200,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant="h5" fontWeight={700} gutterBottom>
                        {slide.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ maxWidth: 400 }}
                      >
                        {slide.description}
                      </Typography>
                    </Box>
                  ))}
                </Carousel>
              </DemoCard>
            </Stack>

            {/* ════════════════════════════════════════════
                § TYPOGRAPHY & CODE
               ════════════════════════════════════════════ */}
            <SectionHeading
              id="typography-code"
              title="Typography & Code"
              subtitle="Code blocks, keyboard shortcuts, and text utilities."
            />

            <Stack spacing={6} sx={{ mb: 12 }}>
              <DemoCard title="CodeBlock — Default">
                <CodeBlock
                  code={SAMPLE_CODE}
                  language="TypeScript"
                  title="MyComponent.tsx"
                  showLineNumbers
                />
              </DemoCard>

              <DemoCard title="CodeBlock — Terminal">
                <CodeBlock
                  code={`$ npm install @mui/material @emotion/react\n$ npx next dev --turbopack\n\n  ▲ Next.js 16.2.1\n  - Local: http://localhost:3000\n  ✓ Ready in 1.2s`}
                  variant="terminal"
                  title="Terminal"
                />
              </DemoCard>

              <DemoCard title="CodeBlock — Compact">
                <Typography
                  variant="body2"
                  component="div"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Use{" "}
                  <CodeBlock
                    code='bgcolor: "surface.container.low"'
                    variant="compact"
                  />{" "}
                  for semantic surface tokens.
                </Typography>
              </DemoCard>

              <DemoCard title="KBD">
                <Stack spacing={2}>
                  <Stack direction="row" spacing={3} alignItems="center">
                    <Typography variant="body2" color="text.secondary">
                      Save:
                    </Typography>
                    <KBD keys={["⌘", "S"]} />
                  </Stack>
                  <Stack direction="row" spacing={3} alignItems="center">
                    <Typography variant="body2" color="text.secondary">
                      Command Palette:
                    </Typography>
                    <KBD keys={["⌘", "⇧", "P"]} />
                  </Stack>
                  <Stack direction="row" spacing={3} alignItems="center">
                    <Typography variant="body2" color="text.secondary">
                      Ghost variant:
                    </Typography>
                    <KBD keys={["Ctrl", "Alt", "Del"]} variant="ghost" />
                  </Stack>
                  <Stack direction="row" spacing={3} alignItems="center">
                    <Typography variant="body2" color="text.secondary">
                      Outlined (small):
                    </Typography>
                    <KBD keys={["Esc"]} variant="outlined" size="small" />
                  </Stack>
                </Stack>
              </DemoCard>

              <DemoCard title="Divider Variants">
                <Stack spacing={3}>
                  <Divider variant="solid" label="Solid with label" />
                  <Divider variant="dashed" />
                  <Divider
                    variant="dotted"
                    label="Dotted"
                    labelPosition="left"
                  />
                  <Divider variant="gradient" />
                  <Divider
                    variant="solid"
                    color="primary"
                    label="Primary color"
                  />
                </Stack>
              </DemoCard>
            </Stack>

            {/* ════════════════════════════════════════════
                § CARDS & PROFILES
               ════════════════════════════════════════════ */}
            <SectionHeading
              id="cards"
              title="Cards & Profiles"
              subtitle="User cards, pricing plans, and notification cards."
            />

            <Stack spacing={6} sx={{ mb: 12 }}>
              {/* User Cards */}
              <DemoCard title="UserCard Variants">
                <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                  <UserCard
                    name="Alice Johnson"
                    subtitle="Lead Designer"
                    status="online"
                    badges={["Admin", "Pro"]}
                    actions={[{ label: "Follow", onClick: () => {} }]}
                  />
                  <UserCard
                    name="Bob Chen"
                    subtitle="Senior Developer"
                    variant="horizontal"
                    status="away"
                    stats={[
                      { label: "Projects", value: 24 },
                      { label: "Commits", value: 1280 },
                    ]}
                  />
                </Stack>
                <MuiDivider sx={{ my: 4 }} />
                <Typography variant="subtitle2" sx={{ mb: 3 }}>
                  Compact
                </Typography>
                <Stack spacing={2} sx={{ maxWidth: 360 }}>
                  <UserCard
                    name="Carol Reyes"
                    subtitle="Designer"
                    variant="compact"
                    status="online"
                  />
                  <UserCard
                    name="David Kim"
                    subtitle="Developer"
                    variant="compact"
                    status="busy"
                  />
                  <UserCard
                    name="Eva Müller"
                    subtitle="PM"
                    variant="compact"
                    status="offline"
                  />
                </Stack>
              </DemoCard>

              {/* Pricing Cards */}
              <DemoCard title="PricingCard">
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={3}
                  alignItems="stretch"
                >
                  {MOCK_PRICING_PLANS.map((plan, i) => (
                    <Box key={plan.title} sx={{ flex: 1 }}>
                      <PricingCard
                        {...plan}
                        variant={i === 1 ? "featured" : "default"}
                        highlighted={i === 1}
                        onCtaClick={() => {}}
                      />
                    </Box>
                  ))}
                </Stack>
              </DemoCard>

              {/* Notification Cards */}
              <DemoCard title="NotificationCard">
                <Stack spacing={2}>
                  {MOCK_NOTIFICATIONS.map((notif, i) => (
                    <NotificationCard
                      key={i}
                      {...notif}
                      variant={
                        i === 0 ? "default" : i === 3 ? "compact" : "default"
                      }
                      onClick={() => {}}
                    />
                  ))}
                </Stack>
              </DemoCard>
            </Stack>

            {/* ════════════════════════════════════════════
                § INDICATORS & PROGRESS
               ════════════════════════════════════════════ */}
            <SectionHeading
              id="indicators"
              title="Indicators & Progress"
              subtitle="Badges, status indicators, and progress displays."
            />

            <Stack spacing={6} sx={{ mb: 12 }}>
              {/* Badge */}
              <DemoCard title="Badge">
                <Stack direction="row" spacing={5} alignItems="center">
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.tertiary"
                      sx={{ mb: 1.5, display: "block" }}
                    >
                      Count
                    </Typography>
                    <Badge variant="count" count={5} color="error">
                      <NotificationsNoneIcon sx={{ fontSize: 28 }} />
                    </Badge>
                  </Box>
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.tertiary"
                      sx={{ mb: 1.5, display: "block" }}
                    >
                      Dot
                    </Typography>
                    <Badge variant="dot" color="primary">
                      <MailOutlineIcon sx={{ fontSize: 28 }} />
                    </Badge>
                  </Box>
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.tertiary"
                      sx={{ mb: 1.5, display: "block" }}
                    >
                      99+
                    </Typography>
                    <Badge variant="count" count={150} color="error">
                      <NotificationsNoneIcon sx={{ fontSize: 28 }} />
                    </Badge>
                  </Box>
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.tertiary"
                      sx={{ mb: 1.5, display: "block" }}
                    >
                      Status
                    </Typography>
                    <Badge variant="status" status="online">
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          bgcolor: "surface.neutral.secondary",
                        }}
                      />
                    </Badge>
                  </Box>
                </Stack>
              </DemoCard>

              {/* StatusDot */}
              <DemoCard title="StatusDot">
                <Stack spacing={3}>
                  <Stack direction="row" spacing={4} alignItems="center">
                    {(
                      ["online", "offline", "away", "busy", "neutral"] as const
                    ).map((status) => (
                      <StatusDot
                        key={status}
                        status={status}
                        showLabel
                        label={status}
                      />
                    ))}
                  </Stack>
                  <Stack direction="row" spacing={4} alignItems="center">
                    <Typography variant="caption" color="text.tertiary">
                      Pulse:
                    </Typography>
                    <StatusDot
                      status="online"
                      variant="pulse"
                      showLabel
                      label="Online"
                    />
                    <StatusDot
                      status="busy"
                      variant="pulse"
                      showLabel
                      label="Busy"
                    />
                  </Stack>
                  <Stack direction="row" spacing={4} alignItems="center">
                    <Typography variant="caption" color="text.tertiary">
                      Badge:
                    </Typography>
                    <StatusDot
                      status="online"
                      variant="badge"
                      showLabel
                      label="Available"
                    />
                    <StatusDot
                      status="away"
                      variant="badge"
                      showLabel
                      label="Away"
                    />
                    <StatusDot
                      status="offline"
                      variant="badge"
                      showLabel
                      label="Offline"
                    />
                  </Stack>
                </Stack>
              </DemoCard>
            </Stack>

            {/* ════════════════════════════════════════════
                § MENUS & OVERLAYS
               ════════════════════════════════════════════ */}
            <SectionHeading
              id="overlays"
              title="Menus & Overlays"
              subtitle="Dropdown menus, command palette, and overlay interactions."
            />

            <Stack spacing={6} sx={{ mb: 8 }}>
              <DemoCard title="DropdownMenu">
                <Stack direction="row" spacing={3}>
                  <DropdownMenu
                    trigger={
                      <Button variant="outlined" size="small">
                        Actions
                      </Button>
                    }
                    items={MOCK_DROPDOWN_ITEMS}
                  />
                  <DropdownMenu
                    trigger={
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ minWidth: "auto", px: 1 }}
                      >
                        <MoreVertIcon fontSize="small" />
                      </Button>
                    }
                    items={MOCK_DROPDOWN_ITEMS}
                    variant="compact"
                    placement="bottom-right"
                  />
                </Stack>
              </DemoCard>

              <DemoCard title="CommandPalette">
                <Stack direction="row" spacing={2} alignItems="center">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setCommandOpen(true)}
                  >
                    Open Command Palette
                  </Button>
                  <Typography variant="caption" color="text.tertiary">
                    or press <KBD keys={["⌘", "K"]} size="small" />
                  </Typography>
                </Stack>
                <CommandPalette
                  open={commandOpen}
                  onClose={() => setCommandOpen(false)}
                  commands={MOCK_COMMANDS}
                  onSelect={() => setCommandOpen(false)}
                />
              </DemoCard>
            </Stack>
          </Container>
        </Box>
      </Stack>
    </>
  );
}
