import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import InterfaceWrapper from "@/modules/shared/components/InterfaceWrapper/InterfaceWrapper.component";
import AppProvider from "@/modules/shared/providers/App.provider";
import { createRootMetadata } from "@/modules/shared/utils/seo.util";

export const metadata = createRootMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="data" defaultMode="system" />
        <AppProvider>
          <InterfaceWrapper>{children}</InterfaceWrapper>
        </AppProvider>
      </body>
    </html>
  );
}
