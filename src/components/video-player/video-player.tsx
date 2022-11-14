import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { Ionicons } from "@expo/vector-icons";

interface IVideoPlayer {
  uri: string;
  shouldPlay?: boolean;
}
export const VideoPlayer = ({ uri, shouldPlay }: IVideoPlayer) => {
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => setIsMuted((m) => !m);

  return (
    <View>
      <Video
        source={{
          uri,
        }}
        resizeMode={ResizeMode.COVER}
        style={{
          width: "100%",
          aspectRatio: 1,
        }}
        isLooping
        isMuted={isMuted}
        shouldPlay={shouldPlay}
      />
      <Pressable
        className="absolute bottom-4 right-4 p-2 bg-gray-900 rounded-full"
        onPress={toggleMute}
      >
        <Ionicons
          name={isMuted ? "volume-mute" : "volume-medium"}
          color="white"
          size={20}
        />
      </Pressable>
    </View>
  );
};
