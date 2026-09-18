import * as icons from "@mui/icons-material";

/* 
* This function returns the MUI icon component from the icons object.
* @Example 
* getIconByString("Home") // → <HomeIcon />
*/
export function getIconByString(string?: keyof typeof icons) {
  if (!string) return null;
  // biome-ignore lint/performance/noDynamicNamespaceImportAccess: intentional — looks up an icon by name from string data (e.g. CMS content)
  return icons[string] || null;
}
