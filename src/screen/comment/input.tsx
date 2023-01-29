import React, { useState } from "react";
import { Alert, Image, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCommentsService } from "../../hooks/useCommentServices";

export const Input = ({ postId }: { postId: string }) => {
  const [text, setText] = useState("");
  const { bottom } = useSafeAreaInsets();
  const { onCreateComment } = useCommentsService(postId);

  const handlePostComment = async () => {
    try {
      await onCreateComment(text);
      setText("");
    } catch (error) {
      Alert.alert("Error submitting comment", (error as Error)?.message);
    }
  };

  return (
    <View
      className="flex-row px-2 border-t-2 border-t-border items-end py-2"
      style={{ bottom }}
    >
      <Image
        source={{
          uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/3.jpg",
        }}
        className="w-10 h-10 rounded-full"
      />
      <View className="flex-row flex-1 border-border border-[1px] px-2 py-3 rounded-3xl ml-1">
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Add a comment..."
          multiline
          className="pr-10"
        />
        <Text
          className="ml-auto font-bold text-blue-500"
          onPress={handlePostComment}
        >
          Post
        </Text>
      </View>
    </View>
  );
};
