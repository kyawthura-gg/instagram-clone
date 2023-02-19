import { Ionicons } from "@expo/vector-icons";
import { Image, View, ViewProps } from "react-native";

interface IAvatar extends ViewProps {
  src: string | undefined | null;
  size?: number;
}

export const Avatar = ({ src, style, size = 40, ...rest }: IAvatar) => {
  return (
    <View style={[style, { width: size, height: size }]} {...rest}>
      {src ? (
        <Image
          source={{ uri: src }}
          className="rounded-full border border-gray-300 absolute inset-0"
          resizeMode="cover"
        />
      ) : (
        <Ionicons size={size} name="person-circle-outline" />
      )}
    </View>
  );
};
