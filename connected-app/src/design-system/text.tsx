import { forwardRef } from "react";
import {
  StyleSheet,
  Text as NativeText,
  TextInput as NativeTextInput,
  type StyleProp,
  type TextInputProps,
  type TextProps,
  type TextStyle,
} from "react-native";

import { typography } from "./tokens";

function numericFontWeight(fontWeight: TextStyle["fontWeight"]) {
  if (fontWeight === "bold") return 700;

  const numericWeight = Number(fontWeight);
  return Number.isNaN(numericWeight) ? 400 : numericWeight;
}

function resolveTypography(style: StyleProp<TextStyle>) {
  const flattenedStyle = StyleSheet.flatten(style);
  const fontFamily = flattenedStyle?.fontFamily ?? typography.sans;
  const fontWeight = numericFontWeight(flattenedStyle?.fontWeight);
  const isDisplay =
    fontFamily === typography.display || fontFamily === typography.displayBold;
  const isInter =
    fontFamily === typography.sans ||
    fontFamily === typography.sansMedium ||
    fontFamily === typography.sansSemiBold ||
    fontFamily === typography.sansBold ||
    fontFamily === typography.mono;

  if (!isDisplay && !isInter) {
    return flattenedStyle;
  }

  if (isDisplay) {
    return {
      ...flattenedStyle,
      fontFamily:
        fontWeight >= 700 ? typography.displayBold : typography.display,
      fontWeight: "normal" as const,
    };
  }

  const interFontFamily =
    fontWeight >= 700
      ? typography.sansBold
      : fontWeight >= 600
        ? typography.sansSemiBold
        : fontWeight >= 500
          ? typography.sansMedium
          : typography.sans;

  return {
    ...flattenedStyle,
    fontFamily: interFontFamily,
    fontWeight: "normal" as const,
  };
}

export const Text = forwardRef<NativeText, TextProps>(function Text(
  { style, ...props },
  ref,
) {
  return <NativeText ref={ref} style={resolveTypography(style)} {...props} />;
});

export const TextInput = forwardRef<NativeTextInput, TextInputProps>(
  function TextInput({ style, ...props }, ref) {
    return (
      <NativeTextInput ref={ref} style={resolveTypography(style)} {...props} />
    );
  },
);
