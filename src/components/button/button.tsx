import React from "react";
import { Pressable, PressableProps, Text, View } from "react-native";

interface IButton extends PressableProps {
  label?: string;
  labelClassName?: string;
}

export const Button = ({
  label,
  className = "",
  labelClassName = "",
  ...otherProps
}: IButton) => {
  return (
    <Pressable
      className={`flex-1 border-border border-[1px] px-2 py-2 items-center rounded-md ${className}`}
      {...otherProps}
    >
      <Text className={`font-semibold ${labelClassName}`}>{label}</Text>
    </Pressable>
  );
};
