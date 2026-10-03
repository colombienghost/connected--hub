import type { PropsWithChildren } from "react";
import { Platform, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { BlurView } from "expo-blur";
import { GlassView, isGlassEffectAPIAvailable } from "expo-glass-effect";

import { colors } from "./tokens";

type GlassSurfaceProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  variant?: "light" | "dark";
}>;

export function GlassSurface({
  children,
  style,
  variant = "light",
}: GlassSurfaceProps) {
  const glassAvailable = Platform.OS === "ios" && isGlassEffectAPIAvailable();
  const tintColor = variant === "dark" ? colors.navy : colors.white;

  if (glassAvailable) {
    return (
      <GlassView
        colorScheme={variant === "dark" ? "dark" : "light"}
        glassEffectStyle="regular"
        style={style}
        tintColor={tintColor}
      >
        {children}
      </GlassView>
    );
  }

  return (
    <BlurView
      intensity={variant === "dark" ? 38 : 26}
      style={[
        styles.fallback,
        variant === "dark" ? styles.darkFallback : styles.lightFallback,
        style,
      ]}
      tint={variant === "dark" ? "dark" : "light"}
    >
      {children}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  fallback: { overflow: "hidden" },
  darkFallback: { backgroundColor: "rgba(6, 37, 79, 0.85)" },
  lightFallback: { backgroundColor: "rgba(250, 251, 253, 0.82)" },
});
