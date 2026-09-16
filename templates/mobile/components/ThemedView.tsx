import { View, type ViewProps } from "react-native";

export function ThemedView({ className = "", ...rest }: ViewProps) {
  return (
    <View className={`bg-white dark:bg-neutral-900 ${className}`} {...rest} />
  );
}
