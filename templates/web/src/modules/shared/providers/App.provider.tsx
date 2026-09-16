import LanguageProvider from "./LanguageProvider.provider";
import QueryProvider from "./Query.provider";
import ThemeProvider from "./Theme.provider";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <QueryProvider>{children}</QueryProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
