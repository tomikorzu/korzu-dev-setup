import ThemeProvider from "./Theme.provider";
import QueryProvider from "./Query.provider";

export default function AppProvider({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
    );
}