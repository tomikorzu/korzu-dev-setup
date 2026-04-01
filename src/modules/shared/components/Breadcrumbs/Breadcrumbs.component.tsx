import { Breadcrumbs as MuiBreadcrumbs, Link, Stack, Typography } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";
import * as icons from "@mui/icons-material";
import { getIconByString } from "../../utils/getIconByString.util";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: keyof typeof icons;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  maxItems?: number;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator,
  maxItems,
}) => {
  return (
    <MuiBreadcrumbs
      separator={separator ?? <NavigateNext sx={{ fontSize: "small" }} />}
      maxItems={maxItems}
      sx={{ "& .MuiBreadcrumbs-separator": { color: "text.tertiary" } }}
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        const Icon = getIconByString(item.icon);

        if (isLast || !item.href) {
          return (
            <Typography
              key={item.label}
              variant="body2"
              color={isLast ? "text.primary" : "text.secondary"}
              fontWeight={isLast ? 600 : 400}
            >
              <Stack direction="row" alignItems="center" gap={0.5}>
                {Icon && <Icon sx={{ fontSize: 14 }} />}
                {item.label}
              </Stack>
            </Typography>
          );
        }

        return (
          <Link
            key={item.label}
            href={item.href}
            underline="none"
            variant="body2"
            color={isLast ? "text.primary" : "text.secondary"}
            fontWeight={isLast ? 600 : 400}
            sx={{ '&:hover': { color: "brand.primary.enabled" } }}
          >
            <Stack direction="row" alignItems="center" gap={1}> {Icon && <Icon sx={{ fontSize: 14 }} />} {item.label}</Stack>
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;
