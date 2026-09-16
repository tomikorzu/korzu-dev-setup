import { ImageResponse } from "next/og";
import { siteConfig } from "@/site.config";
import { projectConfig } from "@/theme/project.config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: projectConfig.brand.primary[900],
        color: "#fff",
        fontSize: 72,
        fontWeight: 700,
      }}
    >
      {siteConfig.name}
    </div>,
    size,
  );
}
