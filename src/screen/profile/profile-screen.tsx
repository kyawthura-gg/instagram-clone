import React from "react";
import { FlatList, Image, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import user from "../../mocks/user.json";
import { ProfileHeader } from "./profile-header";

export const ProfileScreen = () => {
  const renderItem = ({
    item,
    index,
  }: {
    item: typeof user.posts[number];
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

  return (
    <FlatList
      className="flex-1"
      data={user.posts}
      renderItem={renderItem}
      numColumns={3}
      ListHeaderComponent={() => <ProfileHeader user={user} />}
    />
  );
};
