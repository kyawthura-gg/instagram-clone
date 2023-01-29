import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { colors } from "../../theme";
import { Comment as CommentType } from "../../API";

dayjs.extend(relativeTime);

interface IProps {
  comment: CommentType | null;
  showDetails?: boolean;
}
export const Comment = ({ comment, showDetails }: IProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => setIsLiked((l) => !l);

  if (!comment) {
    return null;
  }
  return (
    <View className="flex-row mb-1 items-center">
      {showDetails ? (
        <Image
          source={{ uri: comment.User?.image }}
          className="w-10 h-10 rounded-full mr-2"
        />
      ) : null}
      <View className="flex-1">
        <Text>
          <Text className="font-bold">{comment.User?.username} </Text>
          {comment.comment}
        </Text>
        {showDetails ? (
          <View className="flex-row mt-1 mb-2">
            <Text className="mr-2 text-gray-500">
              {dayjs(comment.createdAt).fromNow()}
            </Text>
            <Text className="mr-2 text-gray-500">5 likes</Text>
            <Text className="text-gray-500">Reply</Text>
          </View>
        ) : null}
      </View>
      <Pressable onPress={toggleLike} hitSlop={10}>
        <AntDesign
          name={isLiked ? "heart" : "hearto"}
          size={14}
          color={isLiked ? colors.accent : colors.black}
        />
      </Pressable>
    </View>
  );
};
