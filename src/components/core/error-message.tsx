import React from "react";
import { View, Text, Image } from "react-native";
import image from "../../assets/images/error.png";
import { Button } from "../button";

interface ErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({
  title = "Error",
  message = "Unknown Error",
  onRetry,
}: ErrorMessageProps) => {
  return (
    <View className="flex-1 items-center p-2.5">
      <Image
        source={image}
        className="w-[70%] h-[200px]"
        resizeMode="contain"
      />
      <Text className="text-lg m-2.5">{title}</Text>
      <Text className="mb-2 text-gray-600">{message}</Text>
      <Button label="Retry" onPress={onRetry} />
    </View>
  );
};
