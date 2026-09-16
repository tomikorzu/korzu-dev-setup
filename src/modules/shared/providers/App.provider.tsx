import ThemeProvider from "./Theme.provider";
import QueryProvider from "./Query.provider";
import LanguageProvider from "./LanguageProvider.provider";

export default function AppProvider({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <LanguageProvider>
                <QueryProvider>{children}</QueryProvider>
            </LanguageProvider>
        </ThemeProvider>
    );
}