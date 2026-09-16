import { useState } from "react";
import { Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  const [count, setCount] = useState(0);

  return (
    <ThemedView className="flex-1 items-center justify-center gap-4 px-6">
      <ThemedText className="text-2xl font-bold">Welcome</ThemedText>
      <ThemedText className="text-center text-neutral-500 dark:text-neutral-400">
        Edit app/index.tsx to get started.
      </ThemedText>
      <Pressable
        onPress={() => setCount((c) => c + 1)}
        className="rounded-full bg-tint px-6 py-3"
      >
        <ThemedText className="font-semibold text-white">
          Tapped {count} times
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}
