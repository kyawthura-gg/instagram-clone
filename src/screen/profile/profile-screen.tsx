import React from "react";
import { ActivityIndicator, FlatList, Image, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ProfileHeader } from "./profile-header";
import { useQuery } from "@apollo/client";
import { getUser } from "../../apollo/user-queries";
import { GetUserQuery, GetUserQueryVariables } from "../../API";
import { RootStackScreenProps } from "../../navigators";
import { ErrorMessage } from "../../components/core/error-message";
import { useAuthContext } from "../../contexts/auth-context";

export const ProfileScreen = ({ route }: RootStackScreenProps<"Profile">) => {
  const userId = route.params?.id;
  const { userId: authUserId } = useAuthContext();
  const { data, loading, error, refetch } = useQuery<
    GetUserQuery,
    GetUserQueryVariables
  >(getUser, {
    variables: { id: userId ?? authUserId },
  });

  const renderItem = ({
    item,
    index,
  }: {
    item: typeof user.Posts.items[number];
    index: number;
  }) => {
    const realIndex = index + 1;
    const isFirstLast = realIndex % 3 === 0 || realIndex % 3 === 1;

    return (
      <View
        className={`flex-1 my-[1] h-full aspect-square max-w-[33.33%] ${
          !isFirstLast ? "mx-[1]" : ""
        } `}
      >
        <Image
          source={{ uri: item.image || item.images[0] }}
          className="flex-1"
        />
        {item.images ? (
          <MaterialIcons
            name="collections"
            color={"white"}
            size={16}
            style={{ position: "absolute", top: 6, right: 6 }}
          />
        ) : null}
      </View>
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

  const user = data.getUser;

  return (
    <FlatList
      onRefresh={refetch}
      refreshing={loading}
      className="flex-1"
      data={user.Posts?.items}
      renderItem={renderItem}
      numColumns={3}
      ListHeaderComponent={() => <ProfileHeader user={user} />}
    />
  );
};
