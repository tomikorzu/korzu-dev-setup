import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals, the OG image, and any file with an extension.
  matcher: ["/((?!api|_next|opengraph-image|.*\\..*).*)"],
};
