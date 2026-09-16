import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// --- Types ---

export type UserCardVariant = "default" | "compact" | "horizontal" | "detailed";

export type UserStatus = "online" | "offline" | "away" | "busy";

export interface UserCardAction {
  label: string;
  onClick: () => void;
  variant?: "contained" | "outlined";
}

export interface UserCardStat {
  label: string;
  value: string | number;
}

export interface UserCardProps {
  name: string;
  subtitle?: string;
  avatar?: string;
  variant?: UserCardVariant;
  status?: UserStatus;
  badges?: string[];
  stats?: UserCardStat[];
  actions?: UserCardAction[];
  onClick?: () => void;
}

// --- Helpers ---

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

/** Maps each status to its semantic color token. */
const STATUS_COLOR: Record<UserStatus, string> = {
  online: "states.positive.primary",
  offline: "text.tertiary",
  away: "states.caution.primary",
  busy: "states.negative.primary",
};

// --- Sub-components ---

/** Small coloured dot that indicates a user's availability. */
function StatusDot({ status }: { status: UserStatus }) {
  return (
    <Box
      sx={{
        width: 10,
        height: 10,
        borderRadius: "50%",
        bgcolor: STATUS_COLOR[status],
        border: 2,
        borderColor: "background.paper",
        position: "absolute",
        bottom: 0,
        right: 0,
      }}
    />
  );
}

/** Avatar wrapped with an optional status indicator. */
function UserAvatar({
  name,
  avatar,
  status,
  size = 56,
}: {
  name: string;
  avatar?: string;
  status?: UserStatus;
  size?: number;
}) {
  return (
    <Box sx={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <Avatar
        src={avatar}
        alt={name}
        sx={{ width: size, height: size, fontSize: size * 0.38 }}
      >
        {getInitials(name)}
      </Avatar>
      {status && <StatusDot status={status} />}
    </Box>
  );
}

/** Row of Chip badges. */
function Badges({ badges }: { badges: string[] }) {
  return (
    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
      {badges.map((badge) => (
        <Chip key={badge} label={badge} size="small" />
      ))}
    </Stack>
  );
}

/** Horizontal row of key-value stats. */
function StatsRow({ stats }: { stats: UserCardStat[] }) {
  return (
    <Stack
      direction="row"
      spacing={3}
      justifyContent="center"
      sx={{
        py: 1.5,
        borderTop: 1,
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      {stats.map((stat) => (
        <Stack key={stat.label} alignItems="center" spacing={0.25}>
          <Typography variant="subtitle2" fontWeight={700}>
            {stat.value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {stat.label}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}

/** Row of action buttons. */
function Actions({ actions }: { actions: UserCardAction[] }) {
  return (
    <Stack direction="row" spacing={1}>
      {actions.map((action) => (
        <Button
          key={action.label}
          size="small"
          variant={action.variant ?? "outlined"}
          onClick={(e) => {
            e.stopPropagation();
            action.onClick();
          }}
          sx={{ textTransform: "none" }}
        >
          {action.label}
        </Button>
      ))}
    </Stack>
  );
}

// --- Variant renderers ---

/** Vertical centred card – the default layout. */
function DefaultVariant(props: UserCardProps) {
  const { name, subtitle, avatar, status, badges, actions } = props;

  return (
    <Stack alignItems="center" spacing={1.5} sx={{ py: 1 }}>
      <UserAvatar name={name} avatar={avatar} status={status} size={64} />

      <Stack alignItems="center" spacing={0.25}>
        <Typography variant="subtitle1" fontWeight={600}>
          {name}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Stack>

      {badges && badges.length > 0 && <Badges badges={badges} />}
      {actions && actions.length > 0 && <Actions actions={actions} />}
    </Stack>
  );
}

/** Small inline row – avatar + name + subtitle. */
function CompactVariant(props: UserCardProps) {
  const { name, subtitle, avatar, status } = props;

  return (
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <UserAvatar name={name} avatar={avatar} status={status} size={36} />

      <Stack spacing={0}>
        <Typography variant="body2" fontWeight={600} noWrap>
          {name}
        </Typography>
        {subtitle && (
          <Typography variant="caption" color="text.secondary" noWrap>
            {subtitle}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}

/** Medium horizontal layout – avatar left, info right. */
function HorizontalVariant(props: UserCardProps) {
  const { name, subtitle, avatar, status, badges, actions } = props;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <UserAvatar name={name} avatar={avatar} status={status} size={56} />

      <Stack spacing={0.75} sx={{ minWidth: 0, flex: 1 }}>
        <Stack spacing={0.25}>
          <Typography variant="subtitle1" fontWeight={600} noWrap>
            {name}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary" noWrap>
              {subtitle}
            </Typography>
          )}
        </Stack>

        {badges && badges.length > 0 && <Badges badges={badges} />}
        {actions && actions.length > 0 && <Actions actions={actions} />}
      </Stack>
    </Stack>
  );
}

/** Full-featured card – avatar, stats, badges, and action buttons. */
function DetailedVariant(props: UserCardProps) {
  const { name, subtitle, avatar, status, badges, stats, actions } = props;

  return (
    <Stack spacing={2}>
      {/* Header */}
      <Stack alignItems="center" spacing={1}>
        <UserAvatar name={name} avatar={avatar} status={status} size={72} />

        <Stack alignItems="center" spacing={0.25}>
          <Typography variant="subtitle1" fontWeight={600}>
            {name}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Stack>

        {badges && badges.length > 0 && <Badges badges={badges} />}
      </Stack>

      {/* Stats */}
      {stats && stats.length > 0 && <StatsRow stats={stats} />}

      {/* Actions */}
      {actions && actions.length > 0 && (
        <Stack direction="row" spacing={1} justifyContent="center">
          {actions.map((action) => (
            <Button
              key={action.label}
              size="small"
              variant={action.variant ?? "outlined"}
              onClick={(e) => {
                e.stopPropagation();
                action.onClick();
              }}
              sx={{ flex: 1, textTransform: "none" }}
            >
              {action.label}
            </Button>
          ))}
        </Stack>
      )}
    </Stack>
  );
}

// --- Map variant to renderer ---

const VARIANT_RENDERER: Record<
  UserCardVariant,
  (props: UserCardProps) => React.JSX.Element
> = {
  default: DefaultVariant,
  compact: CompactVariant,
  horizontal: HorizontalVariant,
  detailed: DetailedVariant,
};

// --- Main component ---

export default function UserCard(props: UserCardProps) {
  const { variant = "default", onClick } = props;

  const Renderer = VARIANT_RENDERER[variant];

  return (
    <Card
      variant="outlined"
      sx={{
        p: variant === "compact" ? 1.5 : 2.5,
        cursor: onClick ? "pointer" : "default",
        transition: "box-shadow 0.2s ease-in-out",
        "&:hover": onClick
          ? { boxShadow: 2 }
          : undefined,
      }}
      onClick={onClick}
    >
      <Renderer {...props} />
    </Card>
  );
}
