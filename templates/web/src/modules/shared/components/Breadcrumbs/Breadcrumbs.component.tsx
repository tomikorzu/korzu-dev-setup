import type * as icons from "@mui/icons-material";
import { NavigateNext } from "@mui/icons-material";
import {
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Stack,
  Typography,
} from "@mui/material";
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
      sx={{
        "& .MuiBreadcrumbs-separator": { color: "text.tertiary" },
        "& .MuiBreadcrumbs-ol > li > button": {
          bgcolor: "surface.container.high",
          color: "text.primary",
        },
      }}
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        const Icon = getIconByString(item.icon);

        if (isLast || !item.href) {
          return (
            <Stack
              key={item.label}
              direction="row"
              alignItems="center"
              gap={0.5}
            >
              {Icon && <Icon sx={{ fontSize: 14 }} />}
              <Typography
                variant="body2"
                component="span"
                color={isLast ? "text.primary" : "text.secondary"}
                fontWeight={isLast ? 600 : 400}
              >
                {item.label}
              </Typography>
            </Stack>
          );
        }

        return (
          <Link
            key={item.label}
            href={item.href || "#"}
            underline="none"
            variant="body2"
            color={isLast ? "text.primary" : "text.secondary"}
            fontWeight={isLast ? 600 : 400}
            sx={{ "&:hover": { color: "brand.primary.enabled" } }}
          >
            <Stack direction="row" alignItems="center" gap={1}>
              {" "}
              {Icon && <Icon sx={{ fontSize: 14 }} />} {item.label}
            </Stack>
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;
