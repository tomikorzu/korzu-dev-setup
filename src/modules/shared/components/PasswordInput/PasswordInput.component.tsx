"use client";

import { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import LinearProgress from "@mui/material/LinearProgress";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

// --- Types ---

export interface PasswordInputProps {
  /** Current password value */
  value: string;
  /** Callback fired when the password value changes */
  onChange: (value: string) => void;
  /** Display variant controlling additional UI elements */
  variant?: "default" | "withStrength" | "withRequirements";
  /** Label text for the input field */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Error message to display below the input */
  error?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Input size */
  size?: "small" | "medium";
  /** Whether the input takes full width of its container */
  fullWidth?: boolean;
}

// --- Strength calculation ---

interface StrengthResult {
  score: number;
  label: string;
  color: "error" | "warning" | "primary" | "success";
}

/** Calculate password strength based on character variety and length */
function calculateStrength(password: string): StrengthResult {
  if (!password) {
    return { score: 0, label: "", color: "error" };
  }

  let points = 0;
  if (password.length >= 8) points++;
  if (password.length >= 12) points++;
  if (/[A-Z]/.test(password)) points++;
  if (/[a-z]/.test(password)) points++;
  if (/[0-9]/.test(password)) points++;
  if (/[^A-Za-z0-9]/.test(password)) points++;

  // Map 0-6 points to a normalized score (0-100) and a label
  const score = Math.round((points / 6) * 100);

  if (score <= 25) return { score, label: "Weak", color: "error" };
  if (score <= 50) return { score, label: "Fair", color: "warning" };
  if (score <= 75) return { score, label: "Good", color: "primary" };
  return { score, label: "Strong", color: "success" };
}

// --- Requirements definition ---

interface Requirement {
  label: string;
  test: (password: string) => boolean;
}

const PASSWORD_REQUIREMENTS: Requirement[] = [
  { label: "At least 8 characters", test: (p) => p.length >= 8 },
  { label: "One uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { label: "One lowercase letter", test: (p) => /[a-z]/.test(p) },
  { label: "One number", test: (p) => /[0-9]/.test(p) },
  { label: "One special character", test: (p) => /[^A-Za-z0-9]/.test(p) },
];

// --- Component ---

export default function PasswordInput({
  value,
  onChange,
  variant = "default",
  label = "Password",
  placeholder,
  error,
  disabled = false,
  size = "medium",
  fullWidth = true,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const strength = useMemo(() => calculateStrength(value), [value]);

  const handleToggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box sx={{ width: fullWidth ? "100%" : "auto" }}>
      {/* Password text field */}
      <TextField
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label={label}
        placeholder={placeholder}
        error={!!error}
        helperText={error}
        disabled={disabled}
        size={size}
        fullWidth={fullWidth}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleToggleVisibility}
                  edge="end"
                  disabled={disabled}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  size={size}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      {/* Strength meter (withStrength variant) */}
      {variant === "withStrength" && value.length > 0 && (
        <Stack spacing={0.5} sx={{ mt: 1 }}>
          <LinearProgress
            variant="determinate"
            value={strength.score}
            color={strength.color}
            sx={{
              height: 6,
              borderRadius: 1,
              bgcolor: (theme) => theme.palette.action.hover,
            }}
          />
          <Typography
            variant="caption"
            sx={{ color: (theme) => theme.palette[strength.color].main }}
          >
            {strength.label}
          </Typography>
        </Stack>
      )}

      {/* Requirements checklist (withRequirements variant) */}
      {variant === "withRequirements" && (
        <Stack spacing={0.5} sx={{ mt: 1.5 }}>
          {PASSWORD_REQUIREMENTS.map((req) => {
            const met = req.test(value);
            return (
              <Stack
                key={req.label}
                direction="row"
                spacing={1}
                sx={{ alignItems: "center" }}
              >
                {met ? (
                  <CheckCircleIcon
                    sx={{
                      fontSize: 16,
                      color: (theme) => theme.palette.success.main,
                    }}
                  />
                ) : (
                  <RadioButtonUncheckedIcon
                    sx={{
                      fontSize: 16,
                      color: (theme) => theme.palette.text.disabled,
                    }}
                  />
                )}
                <Typography
                  variant="caption"
                  sx={{
                    color: (theme) =>
                      met
                        ? theme.palette.success.main
                        : theme.palette.text.secondary,
                  }}
                >
                  {req.label}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      )}
    </Box>
  );
}
