import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export interface SectionHeadingProps {
  id?: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export default function SectionHeading({
  id,
  title,
  subtitle,
  action,
}: SectionHeadingProps) {
  return (
    <Box id={id} sx={{ mb: 6, scrollMarginTop: 80 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: subtitle ? 1 : 0 }}
      >
        <Typography variant="h4" fontWeight={700}>
          {title}
        </Typography>
        {action}
      </Stack>
      {subtitle && (
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
