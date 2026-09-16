"use client";

import { Translate } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { useHideOnScroll } from "@/modules/shared/hooks/useHideOnScroll.hook";
import { useMediaQueryDevices } from "@/modules/shared/hooks/useMediaQueryDevices.hook";
import { useTranslations } from "@/modules/shared/hooks/useTranslations.hook";

export default function ToggleLanguageFab() {
  const { toggleLanguage, language, isHydrated } = useTranslations();
  const { isMediumAndPhone } = useMediaQueryDevices();
  const [isHovered, setIsHovered] = useState(false);

  const shouldShowText = isMediumAndPhone || isHovered;
  const displayLanguage = isHydrated ? language : "ES";
  const show = useHideOnScroll();

  return (
    <Button
      onClick={toggleLanguage}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      sx={{
        position: "fixed",
        top: "15%",
        right: 0,
        bgcolor: "background.paper",
        border: (theme) => `1px solid ${theme.palette.divider}`,
        borderRight: "none",
        borderRadius: "100px 0 0 100px",
        display: "flex",
        alignItems: "center",
        gap: 1,
        py: 1,
        px: { xs: 0.5, md: 1 },
        transition: "all 0.3s ease-in-out",
        color: "text.primary",
        ...(!show && {
          transform: "translateX(100%)",
        }),
        ":hover": {
          filter: "brightness(1.2)",
        },
        zIndex: 1000,
      }}
    >
      <Translate
        sx={{ height: { xs: 14, md: 18 }, width: { xs: 14, md: 18 } }}
      />
      <Typography
        variant="body2"
        fontSize={{ xs: 12, md: 14 }}
        sx={{
          overflow: "hidden",
          transition: "all 0.3s ease-in-out",
          ...(!shouldShowText
            ? {
                opacity: 0,
                maxWidth: 0,
                marginLeft: 0,
              }
            : {
                maxWidth: 28,
              }),
        }}
      >
        {displayLanguage}
      </Typography>
    </Button>
  );
}
