import React, { PropsWithChildren } from "react";
import { Pressable, Text } from "react-native";

interface IDoublePress {
  onDoublePress?: () => void;
}
export const DoublePress = ({
  children,
  ...props
}: PropsWithChildren<IDoublePress>) => {
  let lastTap = 0;
  const handleDoublePress = () => {
    const now = Date.now();
    if (now - lastTap < 300 && props.onDoublePress) {
      props.onDoublePress();
    }
    lastTap = now;
  };
  return <Pressable onPress={handleDoublePress}>{children}</Pressable>;
};
