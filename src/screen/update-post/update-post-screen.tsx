import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { ActivityIndicator, TextInput, View } from "react-native";
import {
  GetPostQuery,
  GetPostQueryVariables,
  UpdatePostMutation,
  UpdatePostMutationVariables,
} from "../../API";
import { updatePost } from "../../apollo/post-mutations";
import { getPost } from "../../apollo/post-queries";
import { Button } from "../../components/button";
import { ErrorMessage } from "../../components/core/error-message";
import { RootStackScreenProps } from "../../navigators";

export const UpdatePostScreen = ({
  route: { params },
  navigation: { goBack },
}: RootStackScreenProps<"UpdatePost">) => {
  const id = params.id;
  const [description, setDescription] = useState("");

  const { data, loading, error } = useQuery<
    GetPostQuery,
    GetPostQueryVariables
  >(getPost, {
    variables: { id },
    onCompleted: (data) => {
      if (!data?.getPost?.description) {
        return;
      }
      setDescription(data?.getPost?.description);
    },
  });
  const post = data?.getPost;

  const [doUpdatePost] = useMutation<
    UpdatePostMutation,
    UpdatePostMutationVariables
  >(updatePost, {
    onCompleted: () => {
      goBack();
    },
  });

  const handleSubmit = async () => {
    if (!post) {
      return;
    }
    doUpdatePost({
      variables: {
        input: {
          id: post.id,
          _version: post._version,
          description,
        },
      },
    });
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return (
      <ErrorMessage title="Error fetching post" message={error?.message} />
    );
  }

  return (
    <View className="items-center">
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Description..."
        multiline
        numberOfLines={5}
        className="my-2.5 self-stretch bg-white p-2.5 rounded"
      />
      <Button label="Submit" onPress={handleSubmit} />
    </View>
  );
};
