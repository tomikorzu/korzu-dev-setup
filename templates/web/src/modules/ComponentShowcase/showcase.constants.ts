import type { AvatarGroupItem } from "@/modules/shared/components/AvatarGroup/AvatarGroup";
import type { BreadcrumbItem } from "@/modules/shared/components/Breadcrumbs/Breadcrumbs.component";
import type { ChatMessage } from "@/modules/shared/components/ChatThread/ChatThread";
import type { StatCardProps } from "@/modules/shared/components/StatCard/StatCard";
import type { TimelineItem } from "@/modules/shared/components/Timeline/Timeline";

// ── Table ───────────────────────────────────────

export interface MockUser {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
  joined: string;
}

export const MOCK_USERS: MockUser[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@acme.com",
    role: "Admin",
    status: "active",
    joined: "Jan 2024",
  },
  {
    id: 2,
    name: "Bob Chen",
    email: "bob@acme.com",
    role: "Developer",
    status: "active",
    joined: "Mar 2024",
  },
  {
    id: 3,
    name: "Carol Reyes",
    email: "carol@acme.com",
    role: "Designer",
    status: "inactive",
    joined: "Jun 2023",
  },
  {
    id: 4,
    name: "David Kim",
    email: "david@acme.com",
    role: "Developer",
    status: "active",
    joined: "Nov 2023",
  },
  {
    id: 5,
    name: "Eva Müller",
    email: "eva@acme.com",
    role: "PM",
    status: "pending",
    joined: "Feb 2024",
  },
  {
    id: 6,
    name: "Frank Ito",
    email: "frank@acme.com",
    role: "Developer",
    status: "active",
    joined: "Dec 2023",
  },
  {
    id: 7,
    name: "Grace Liu",
    email: "grace@acme.com",
    role: "Designer",
    status: "active",
    joined: "May 2024",
  },
  {
    id: 8,
    name: "Henry Torres",
    email: "henry@acme.com",
    role: "QA",
    status: "inactive",
    joined: "Sep 2023",
  },
];

// ── Stats ───────────────────────────────────────

export const MOCK_STATS: Omit<StatCardProps, "variant">[] = [
  {
    title: "Total Users",
    value: "12,847",
    trend: { direction: "up", label: "+12.5% from last month" },
  },
  {
    title: "Revenue",
    value: "$48,290",
    trend: { direction: "up", label: "+8.2% from last month" },
  },
  {
    title: "Active Sessions",
    value: "1,024",
    trend: { direction: "down", label: "-3.1% from last hour" },
  },
  {
    title: "Bounce Rate",
    value: "24.8%",
    trend: { direction: "neutral", label: "No change" },
  },
];

// ── Chat ────────────────────────────────────────

export const MOCK_MESSAGES: ChatMessage[] = [
  {
    id: "1",
    message: "Hey! How's the project going?",
    variant: "received",
    timestamp: "10:30 AM",
    avatar: { alt: "Alice Johnson" },
  },
  {
    id: "2",
    message: "Going well! Just finished the component library.",
    variant: "sent",
    timestamp: "10:31 AM",
    status: "read",
  },
  {
    id: "3",
    message: "That's awesome 🎉 Can you show me a demo?",
    variant: "received",
    timestamp: "10:32 AM",
    avatar: { alt: "Alice Johnson" },
  },
  {
    id: "4",
    message: "Sure, I'll deploy a preview in a few minutes.",
    variant: "sent",
    timestamp: "10:33 AM",
    status: "delivered",
  },
  {
    id: "5",
    message:
      "Perfect, take your time. I'm reviewing the design tokens in the meantime.",
    variant: "received",
    timestamp: "10:34 AM",
    avatar: { alt: "Alice Johnson" },
  },
  {
    id: "6",
    message: "Sounds good. The dark mode switch is working now too.",
    variant: "sent",
    timestamp: "10:35 AM",
    status: "sent",
  },
];

// ── Timeline ────────────────────────────────────

export const MOCK_TIMELINE: TimelineItem[] = [
  {
    id: "1",
    title: "Project created",
    description: "Repository initialized with Next.js + MUI setup",
    timestamp: "2 days ago",
    color: "primary",
  },
  {
    id: "2",
    title: "Theme system completed",
    description: "Dark/light mode with token-based theming",
    timestamp: "1 day ago",
    color: "success",
  },
  {
    id: "3",
    title: "Component library started",
    description: "18 shared components planned and scaffolded",
    timestamp: "5 hours ago",
    color: "info",
  },
  {
    id: "4",
    title: "Build failed",
    description: "TypeScript error in alert overrides — missing text tokens",
    timestamp: "3 hours ago",
    color: "error",
  },
  {
    id: "5",
    title: "Build fixed & deployed",
    description: "All components rendering correctly in dark and light mode",
    timestamp: "1 hour ago",
    color: "success",
  },
];

// ── Breadcrumbs ─────────────────────────────────

export const MOCK_BREADCRUMBS: BreadcrumbItem[] = [
  { label: "Home", href: "/", icon: "Home" },
  { label: "Components", href: "/components", icon: "Widgets" },
  { label: "Data Display" },
];

// ── Avatars ─────────────────────────────────────

export const MOCK_AVATARS: AvatarGroupItem[] = [
  { alt: "Alice Johnson" },
  { alt: "Bob Chen" },
  { alt: "Carol Reyes" },
  { alt: "David Kim" },
  { alt: "Eva Müller" },
  { alt: "Frank Ito" },
];

// ── Carousel slides ─────────────────────────────

export const CAROUSEL_SLIDES = [
  {
    title: "Blazing Fast",
    description: "Built on Next.js 16 with Turbopack for instant HMR.",
  },
  {
    title: "Token-Driven",
    description: "Change one file, rebrand the entire app.",
  },
  {
    title: "Dark & Light",
    description: "CSS variable-based mode switching with zero flash.",
  },
  {
    title: "Type-Safe",
    description: "Full TypeScript coverage with module augmentations.",
  },
  {
    title: "Zero SX Spaghetti",
    description: "Component overrides and variants handle 90% of styling.",
  },
];

// ── Stepper ─────────────────────────────────────

export const MOCK_STEPPER_STEPS = [
  { label: "Account", description: "Create your account" },
  { label: "Profile", description: "Set up your profile" },
  { label: "Billing", description: "Add payment method" },
  { label: "Review", description: "Confirm your details" },
];

// ── Accordion ───────────────────────────────────

export const MOCK_ACCORDION_ITEMS = [
  {
    id: "a1",
    title: "What is this component library?",
    content:
      "A collection of professionally crafted, reusable React components built on MUI v7 with semantic design tokens.",
  },
  {
    id: "a2",
    title: "Can I customize the theme?",
    content:
      "Yes! The entire library is token-driven. Change one file and rebrand everything — colors, typography, spacing, and more.",
  },
  {
    id: "a3",
    title: "Does it support dark mode?",
    content:
      "Absolutely. CSS variable-based switching with zero flash on page load, respecting the user's system preference.",
  },
  {
    id: "a4",
    title: "Is it production-ready?",
    content:
      "The components follow professional patterns with proper TypeScript interfaces, accessibility considerations, and performance optimizations.",
  },
];

// ── Pricing ─────────────────────────────────────

export const MOCK_PRICING_PLANS = [
  {
    title: "Starter",
    price: 0,
    description: "Perfect for side projects",
    features: [
      { text: "Up to 3 projects", included: true },
      { text: "Basic analytics", included: true },
      { text: "Community support", included: true },
      { text: "Custom domains", included: false },
      { text: "Team collaboration", included: false },
    ],
  },
  {
    title: "Pro",
    price: 29,
    badge: "Most Popular",
    description: "For growing teams",
    features: [
      { text: "Unlimited projects", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Priority support", included: true },
      { text: "Custom domains", included: true },
      { text: "Team collaboration", included: false },
    ],
  },
  {
    title: "Enterprise",
    price: 99,
    description: "For large organizations",
    features: [
      { text: "Unlimited projects", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Dedicated support", included: true },
      { text: "Custom domains", included: true },
      { text: "Team collaboration", included: true },
    ],
  },
];

// ── Notifications ───────────────────────────────

export const MOCK_NOTIFICATIONS = [
  {
    title: "New comment",
    message: "Alice mentioned you in a code review.",
    // NotificationCard formats this itself via formatRelativeTime(), so it needs a real
    // parseable date, not a pre-formatted string like "2 min ago".
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    type: "mention" as const,
    read: false,
  },
  {
    title: "Build succeeded",
    message: "Production deployment completed successfully.",
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    type: "success" as const,
    read: false,
  },
  {
    title: "API limit warning",
    message: "You've used 85% of your monthly API quota.",
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    type: "warning" as const,
    read: true,
  },
  {
    title: "System update",
    message: "Scheduled maintenance tonight at 2:00 AM UTC.",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    type: "system" as const,
    read: true,
  },
];

// ── Command palette ─────────────────────────────

export const MOCK_COMMANDS = [
  {
    id: "1",
    label: "Go to Dashboard",
    group: "Navigation",
    shortcut: ["⌘", "D"],
  },
  {
    id: "2",
    label: "Go to Settings",
    group: "Navigation",
    shortcut: ["⌘", ","],
  },
  {
    id: "3",
    label: "Go to Components",
    group: "Navigation",
    shortcut: ["⌘", "K"],
  },
  {
    id: "4",
    label: "Toggle Dark Mode",
    group: "Actions",
    shortcut: ["⌘", "⇧", "D"],
  },
  {
    id: "5",
    label: "Create New Project",
    group: "Actions",
    shortcut: ["⌘", "N"],
  },
  { id: "6", label: "Search Files", group: "Actions", shortcut: ["⌘", "P"] },
  { id: "7", label: "View Documentation", group: "Help" },
  { id: "8", label: "Report a Bug", group: "Help" },
];

// ── Dropdown menu ───────────────────────────────

export const MOCK_DROPDOWN_ITEMS = [
  { id: "edit", label: "Edit", shortcut: "⌘E" },
  { id: "duplicate", label: "Duplicate", shortcut: "⌘D" },
  { id: "share", label: "Share" },
  { id: "divider1", label: "", divider: true },
  { id: "archive", label: "Archive" },
  { id: "delete", label: "Delete", danger: true, shortcut: "⌫" },
];
