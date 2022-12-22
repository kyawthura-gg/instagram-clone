import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import React from "react";
import { useQuery } from "@apollo/client";
import {
  LikesForPostByUserQuery,
  LikesForPostByUserQueryVariables,
} from "../../API";
import { likesForPostByUser } from "../../apollo/like/queries";
import { RootStackScreenProps } from "../../navigators";
import { ErrorMessage } from "../../components/core/error-message";

export const PostLikesScreen = ({
  navigation: { navigate },
  route,
}: RootStackScreenProps<"PostLikes">) => {
  const { id } = route.params;

  const { data, loading, error, refetch } = useQuery<
    LikesForPostByUserQuery,
    LikesForPostByUserQueryVariables
  >(likesForPostByUser, { variables: { postID: id } });

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return (
      <ErrorMessage title="Error fetching likes" message={error.message} />
    );
  }

  const likes =
    data?.likesForPostByUser?.items.filter((like) => !like?._deleted) || [];

  const renderItem = ({
    item,
  }: {
    item: Exclude<typeof likes, undefined>[number];
  }) => {
    const user = item?.User;
    if (!user) {
      return null;
    }
    const navigateUser = () => navigate("Profile", { id: user.id });
    return (
      <Pressable onPress={navigateUser} className="flex-row items-center p-2.5">
        <Image
          source={{ uri: user.image }}
          className="w-12 aspect-square rounded-3xl mr-2.5 bg-gray-300"
        />

        <View>
          <Text className="font-bold m-1.5">{user.name}</Text>
          <Text className="text-gray-500">{user.username}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <FlatList
      data={likes}
      renderItem={renderItem}
      refreshing={loading}
      onRefresh={refetch}
    />
  );
};
