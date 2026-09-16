"use client";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export interface AsideMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface AsideMenuProps {
  items: AsideMenuItem[];
  activeId: string;
  onItemClick?: (id: string) => void;
  width?: number;
}

export default function AsideMenu({
  items,
  activeId,
  onItemClick,
  width = 240,
}: AsideMenuProps) {
  const handleClick = (id: string) => {
    onItemClick?.(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      component="nav"
      sx={{
        width,
        flexShrink: 0,
        position: "sticky",
        top: 80,
        height: "calc(100vh - 96px)",
        overflow: "auto",
        display: { xs: "none", md: "block" },
      }}
    >
      <List disablePadding>
        {items.map((item) => (
          <ListItemButton
            key={item.id}
            selected={item.id === activeId}
            onClick={() => handleClick(item.id)}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              py: 1.5,
              px: 3,
            }}
          >
            {item.icon && (
              <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
            )}
            <ListItemText
              primary={item.label}
              slotProps={{
                primary: {
                  variant: "body2",
                  fontWeight: item.id === activeId ? 600 : 400,
                },
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
