import { Auth } from "aws-amplify";
import React from "react";
import { Image, Text, View } from "react-native";
import { Button } from "../../components/button";

interface Props {
  user: {
    image: string;
    name: string;
    bio: string;
  };
}

export const ProfileHeader = ({ user }: Props) => {
  return (
    <View className="px-3">
      <View className="flex-row items-center justify-between">
        <Image
          source={{
            uri: user.image,
          }}
          className="w-20 h-20 rounded-full"
        />

        <View className="items-center">
          <Text className="font-bold">98</Text>
          <Text>Posts</Text>
        </View>
        <View className="items-center">
          <Text className="font-bold">105</Text>
          <Text>Followers</Text>
        </View>
        <View className="items-center">
          <Text className="font-bold">472</Text>
          <Text>Following</Text>
        </View>
      </View>
      <Text className="mt-4 font-bold">{user.name}</Text>
      <Text className="text-gray-500 mt-1">{user.bio}</Text>
      <View className="flex-row mt-4 mb-2">
        <Button label="Edit Profile" className="mr-2" />
        <Button label="Logout" onPress={() => Auth.signOut()} />
      </View>
    </View>
  );
};
