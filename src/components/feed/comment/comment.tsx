import React from "react";
import { Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { IComment } from "../feed-post";

export const Comment = ({ comment }: { comment: IComment }) => {
  return (
    <View className="flex-row mt-1 items-center">
      <Text>
        <Text className="font-bold">{comment.user.username} </Text>
        {comment.comment}
      </Text>
      <AntDesign name={"hearto"} size={14} style={{ marginLeft: "auto" }} />
    </View>
  );
};
