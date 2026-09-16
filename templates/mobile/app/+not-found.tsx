import { Link, Stack } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Not found" }} />
      <ThemedView className="flex-1 items-center justify-center gap-2 px-6">
        <ThemedText className="text-lg font-semibold">
          This screen doesn't exist.
        </ThemedText>
        <Link href="/" className="text-tint underline">
          Go to home screen
        </Link>
      </ThemedView>
    </>
  );
}
