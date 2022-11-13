import { useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import { ListUsersQuery, ListUsersQueryVariables } from "../../API";
import { listUsers } from "../../apollo/user-queries";
import { ErrorMessage } from "../core/error-message";

export const UserSearch = () => {
  const { navigate } = useNavigation();
  const { data, loading, error, refetch } = useQuery<
    ListUsersQuery,
    ListUsersQueryVariables
  >(listUsers);

  const users = data?.listUsers?.items ?? [];

  const renderItem = ({ item }: { item: typeof users[number] }) => {
    const navigateUser = () => navigate("Profile", { id: item.id });
    return (
      <Pressable onPress={navigateUser} className="flex-row items-center p-2.5">
        <Image
          source={{ uri: item.image }}
          className="w-12 aspect-square rounded-3xl mr-2.5 bg-gray-300"
        />

        <View>
          <Text className="font-bold m-1.5">{item.name}</Text>
          <Text className="text-gray-500">{item.username}</Text>
        </View>
      </Pressable>
    );
  };

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return (
      <ErrorMessage
        title="Error fetching user"
        message={error?.message}
        onRetry={refetch}
      />
    );
  }

  return (
    <FlatList
      data={users}
      renderItem={renderItem}
      onRefresh={refetch}
      refreshing={loading}
    />
  );
};
