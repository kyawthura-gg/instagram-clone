import { useQuery } from "@apollo/client";
import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import {
  CommentsByPostQuery,
  CommentsByPostQueryVariables,
  ModelSortDirection,
} from "../../API";
import { commentsByPost } from "../../apollo/comment";
import { Comment } from "../../components/comment";
import { ErrorMessage } from "../../components/core/error-message";
import { RootStackScreenProps } from "../../navigators";
import { Input } from "./input";

export const CommentScreen = ({ route }: RootStackScreenProps<"Comment">) => {
  const { postId } = route.params;

  const { data, loading, error } = useQuery<
    CommentsByPostQuery,
    CommentsByPostQueryVariables
  >(commentsByPost, {
    variables: { postID: postId, sortDirection: ModelSortDirection.DESC },
  });

  const comments = data?.commentsByPost?.items;

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return (
      <ErrorMessage title="Error fetching comments" message={error.message} />
    );
  }
  return (
    <View className="flex-1 bg-white">
      <FlatList
        className="grow px-3"
        data={comments}
        renderItem={({ item }) => <Comment comment={item} showDetails />}
        inverted
        ListEmptyComponent={() => (
          <Text className="text-center">No comments. Be the first comment</Text>
        )}
      />
      <Input postId={postId} />
    </View>
  );
};
