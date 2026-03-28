import ThemeProvider from "./Theme.provider";

export default function AppProvider({ children }: { children: React.ReactNode }) {
    return <ThemeProvider>{children}</ThemeProvider>;
}