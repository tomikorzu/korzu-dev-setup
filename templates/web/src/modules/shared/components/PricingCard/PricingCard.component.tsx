import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// ─── Types ───────────────────────────────────────────────────────────────────

export type PricingCardVariant = "default" | "featured" | "compact";

export interface PricingCardFeature {
  text: string;
  included: boolean;
}

export interface PricingCardProps {
  /** Plan name displayed as the card title */
  title: string;
  /** Price value (e.g. 29 or "Free") */
  price: string | number;
  /** Currency symbol displayed before the price */
  currency?: string;
  /** Billing period displayed after the price */
  period?: string;
  /** Short description of the plan */
  description?: string;
  /** List of features with included/excluded status */
  features: PricingCardFeature[];
  /** Layout variant */
  variant?: PricingCardVariant;
  /** Adds emphasis border and subtle background highlight */
  highlighted?: boolean;
  /** Badge text shown at the top of the card (e.g. "Most Popular") */
  badge?: string;
  /** Call-to-action button label */
  ctaLabel?: string;
  /** Callback fired when the CTA button is clicked */
  onCtaClick?: () => void;
  /** Disables the CTA button */
  disabled?: boolean;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Padding map per variant. */
const VARIANT_PADDING: Record<PricingCardVariant, number> = {
  default: 3,
  featured: 4,
  compact: 2,
};

// ─── Sub-components ──────────────────────────────────────────────────────────

/** Renders the price block with currency, value, and billing period. */
function PriceDisplay({
  price,
  currency = "$",
  period = "/mo",
  large = false,
}: {
  price: string | number;
  currency?: string;
  period?: string;
  large?: boolean;
}) {
  const isNumeric = typeof price === "number";

  return (
    <Stack direction="row" alignItems="baseline" spacing={0.5}>
      {isNumeric && (
        <Typography
          variant={large ? "h5" : "h6"}
          fontWeight={600}
          color="text.secondary"
          sx={{ alignSelf: "flex-start", mt: large ? 0.8 : 0.5 }}
        >
          {currency}
        </Typography>
      )}

      <Typography
        variant={large ? "h2" : "h3"}
        fontWeight={800}
        color="text.primary"
        sx={{ lineHeight: 1 }}
      >
        {isNumeric ? price : price}
      </Typography>

      {isNumeric && (
        <Typography variant="body2" color="text.secondary" fontWeight={500}>
          {period}
        </Typography>
      )}
    </Stack>
  );
}

/** Renders a single feature line with a check or close icon. */
function FeatureItem({ feature }: { feature: PricingCardFeature }) {
  return (
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 20,
          height: 20,
          borderRadius: "50%",
          bgcolor: feature.included
            ? "surface.positive.secondary"
            : "surface.secondary",
          color: feature.included ? "text.positive.primary" : "text.tertiary",
          flexShrink: 0,
        }}
      >
        {feature.included ? (
          <CheckIcon sx={{ fontSize: 14 }} />
        ) : (
          <CloseIcon sx={{ fontSize: 14 }} />
        )}
      </Box>

      <Typography
        variant="body2"
        color={feature.included ? "text.primary" : "text.tertiary"}
        sx={{
          textDecoration: feature.included ? "none" : "line-through",
        }}
      >
        {feature.text}
      </Typography>
    </Stack>
  );
}

/** Renders the full feature list. */
function FeatureList({ features }: { features: PricingCardFeature[] }) {
  return (
    <Stack spacing={1.25}>
      {features.map((feature) => (
        <FeatureItem key={feature.text} feature={feature} />
      ))}
    </Stack>
  );
}

// ─── Variant renderers ───────────────────────────────────────────────────────

/** Standard card with title, price, description, feature list, and CTA. */
function DefaultVariant(props: PricingCardProps) {
  const {
    title,
    price,
    currency,
    period,
    description,
    features,
    ctaLabel = "Get Started",
    onCtaClick,
    disabled,
  } = props;

  return (
    <Stack spacing={3} sx={{ height: "100%" }}>
      {/* Header */}
      <Stack spacing={1}>
        <Typography variant="h6" fontWeight={700}>
          {title}
        </Typography>

        <PriceDisplay price={price} currency={currency} period={period} />

        {description && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {description}
          </Typography>
        )}
      </Stack>

      {/* Features */}
      <Box sx={{ flex: 1 }}>
        <FeatureList features={features} />
      </Box>

      {/* CTA */}
      <Button
        variant="outlined"
        size="large"
        fullWidth
        disabled={disabled}
        onClick={onCtaClick}
        sx={{ textTransform: "none", fontWeight: 600 }}
      >
        {ctaLabel}
      </Button>
    </Stack>
  );
}

/** Larger card with highlighted border, badge ribbon, and prominent CTA. */
function FeaturedVariant(props: PricingCardProps) {
  const {
    title,
    price,
    currency,
    period,
    description,
    features,
    badge,
    ctaLabel = "Get Started",
    onCtaClick,
    disabled,
  } = props;

  return (
    <Stack spacing={3} sx={{ height: "100%" }}>
      {/* Badge */}
      {badge && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: -1 }}>
          <Chip
            label={badge}
            size="small"
            color="primary"
            sx={{ fontWeight: 700, letterSpacing: 0.5 }}
          />
        </Box>
      )}

      {/* Header */}
      <Stack spacing={1} alignItems="center" textAlign="center">
        <Typography variant="h5" fontWeight={800}>
          {title}
        </Typography>

        <PriceDisplay price={price} currency={currency} period={period} large />

        {description && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {description}
          </Typography>
        )}
      </Stack>

      {/* Features */}
      <Box sx={{ flex: 1 }}>
        <FeatureList features={features} />
      </Box>

      {/* CTA */}
      <Button
        variant="contained"
        size="large"
        fullWidth
        disabled={disabled}
        onClick={onCtaClick}
        sx={{ textTransform: "none", fontWeight: 700, py: 1.5 }}
      >
        {ctaLabel}
      </Button>
    </Stack>
  );
}

/** Minimal card with reduced padding and no description. */
function CompactVariant(props: PricingCardProps) {
  const {
    title,
    price,
    currency,
    period,
    features,
    ctaLabel = "Get Started",
    onCtaClick,
    disabled,
  } = props;

  return (
    <Stack spacing={2} sx={{ height: "100%" }}>
      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="subtitle1" fontWeight={700}>
          {title}
        </Typography>

        <PriceDisplay price={price} currency={currency} period={period} />
      </Stack>

      {/* Features */}
      <Box sx={{ flex: 1 }}>
        <FeatureList features={features} />
      </Box>

      {/* CTA */}
      <Button
        variant="outlined"
        size="medium"
        fullWidth
        disabled={disabled}
        onClick={onCtaClick}
        sx={{ textTransform: "none", fontWeight: 600 }}
      >
        {ctaLabel}
      </Button>
    </Stack>
  );
}

// ─── Variant map ─────────────────────────────────────────────────────────────

const VARIANT_RENDERER: Record<
  PricingCardVariant,
  (props: PricingCardProps) => React.JSX.Element
> = {
  default: DefaultVariant,
  featured: FeaturedVariant,
  compact: CompactVariant,
};

// ─── Main component ─────────────────────────────────────────────────────────

export default function PricingCard(props: PricingCardProps) {
  const { variant = "default", highlighted = false } = props;

  const isFeatured = variant === "featured";
  const padding = VARIANT_PADDING[variant];

  const Renderer = VARIANT_RENDERER[variant];

  return (
    <Box
      sx={{
        position: "relative",
        bgcolor: "surface.primary",
        border: isFeatured || highlighted ? 2 : 1,
        borderColor:
          isFeatured || highlighted
            ? "brand.primary.enabled"
            : "border.secondary",
        borderRadius: 3,
        p: padding,
        transition:
          "box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out",
        boxShadow: isFeatured ? 4 : highlighted ? 2 : 0,
        "&:hover": {
          boxShadow: isFeatured ? 6 : 2,
        },
        ...(highlighted && !isFeatured ? { bgcolor: "surface.active" } : {}),
      }}
    >
      <Renderer {...props} />
    </Box>
  );
}
