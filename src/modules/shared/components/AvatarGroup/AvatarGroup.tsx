import MuiAvatar from "@mui/material/Avatar";
import MuiAvatarGroup from "@mui/material/AvatarGroup";
import { getInitials } from "../../utils/getInitials";

export interface AvatarGroupItem {
  src?: string;
  alt: string;
  fallback?: string;
}

export interface AvatarGroupProps {
  avatars: AvatarGroupItem[];
  max?: number;
  size?: "small" | "medium" | "large";
}

const SIZE_MAP = {
  small: 28,
  medium: 36,
  large: 48,
} as const;

export default function AvatarGroup({
  avatars,
  max = 4,
  size = "medium",
}: AvatarGroupProps) {
  const px = SIZE_MAP[size];
  const fontSize = size === "small" ? "0.65rem" : size === "large" ? "1rem" : "0.8rem";

  return (
    <MuiAvatarGroup
      max={max}
      sx={{
        "& .MuiAvatar-root": {
          width: px,
          height: px,
          fontSize,
          borderWidth: 2,
        },
      }}
    >
      {avatars.map((avatar) => (
        <MuiAvatar key={avatar.alt} src={avatar.src} alt={avatar.alt}>
          {avatar.fallback ?? getInitials(avatar.alt)}
        </MuiAvatar>
      ))}
    </MuiAvatarGroup>
  );
}
