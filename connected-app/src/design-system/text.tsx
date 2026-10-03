import { forwardRef } from "react";
import {
  Text as NativeText,
  TextInput as NativeTextInput,
  type TextInputProps,
  type TextProps,
} from "react-native";

import { typography } from "./tokens";

export const Text = forwardRef<NativeText, TextProps>(function Text(
  { style, ...props },
  ref,
) {
  return (
    <NativeText
      ref={ref}
      style={[{ fontFamily: typography.sans }, style]}
      {...props}
    />
  );
});

export const TextInput = forwardRef<NativeTextInput, TextInputProps>(
  function TextInput({ style, ...props }, ref) {
    return (
      <NativeTextInput
        ref={ref}
        style={[{ fontFamily: typography.sans }, style]}
        {...props}
      />
    );
  },
);
