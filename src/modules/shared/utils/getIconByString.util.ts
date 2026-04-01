import * as icons from "@mui/icons-material";

export function getIconByString(string?: keyof typeof icons) {
    if (!string) return null;
    return icons[string] || null;
}