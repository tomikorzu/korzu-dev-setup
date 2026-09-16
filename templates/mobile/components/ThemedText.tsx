import { Text, type TextProps } from "react-native";

export function ThemedText({ className = "", ...rest }: TextProps) {
  return (
    <Text className={`text-black dark:text-white ${className}`} {...rest} />
  );
}
