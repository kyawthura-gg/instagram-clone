import { useMutation, useQuery } from "@apollo/client";
import { Alert } from "react-native";
import {
  CreateCommentMutation,
  CreateCommentMutationVariables,
  GetPostQuery,
  GetPostQueryVariables,
  UpdatePostMutation,
  UpdatePostMutationVariables,
} from "../API";
import { createComment } from "../apollo/comment";
import { updatePost } from "../apollo/post-mutations";
import { getPost } from "../apollo/post-queries";
import { useAuthContext } from "../contexts/auth-context";

export const useCommentsService = (postId: string) => {
  const { userId } = useAuthContext();

  const { data: postData } = useQuery<GetPostQuery, GetPostQueryVariables>(
    getPost,
    { variables: { id: postId } },
  );
  const post = postData?.getPost;

  const [doUpdatePost] = useMutation<
    UpdatePostMutation,
    UpdatePostMutationVariables
  >(updatePost);

  const [doCreateComment] = useMutation<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >(createComment);

  const incrementNofComments = (amount: 1 | -1) => {
    if (!post) {
      Alert.alert("Failed to load post. Try again later");
      return;
    }
    doUpdatePost({
      variables: {
        input: {
          id: post.id,
          _version: post._version,
          nofComments: post.nofComments + amount,
        },
      },
    });
  };

  const onCreateComment = async (newComment: string) => {
    if (!post) {
      Alert.alert("Failed to load post. Try again later");
      return;
    }
    try {
      await doCreateComment({
        variables: {
          input: {
            postID: post.id,
            userID: userId,
            comment: newComment,
          },
        },
      });
      incrementNofComments(1);
    } catch (e) {
      Alert.alert("Error submitting the comment", (e as Error).message);
    }
  };

  return {
    onCreateComment,
  };
};
