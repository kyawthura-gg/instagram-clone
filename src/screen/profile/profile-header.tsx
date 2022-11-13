import { useNavigation } from "@react-navigation/native";
import { Auth } from "aws-amplify";
import React from "react";
import { Image, Text, View } from "react-native";
import { User as IUser } from "../../API";
import { Button } from "../../components/button";
import { useAuthContext } from "../../contexts/auth-context";

interface Props {
  user: IUser;
}

export const ProfileHeader = ({ user }: Props) => {
  const { navigate } = useNavigation();
  const { userId: authUserId } = useAuthContext();

  return (
    <View className="px-3">
      <View className="flex-row items-center justify-between">
        <Image
          source={{
            uri: user.image,
          }}
          className="w-20 h-20 rounded-full bg-gray-400"
        />

        <View className="items-center">
          <Text className="font-bold">{user.nofPosts}</Text>
          <Text>Posts</Text>
        </View>
        <View className="items-center">
          <Text className="font-bold">{user.nofFollowers}</Text>
          <Text>Followers</Text>
        </View>
        <View className="items-center">
          <Text className="font-bold">{user.nofFollowings}</Text>
          <Text>Following</Text>
        </View>
      </View>
      <Text className="mt-4 font-bold">{user.name}</Text>
      <Text className="text-gray-500 mt-1">{user.bio}</Text>
      {user.id === authUserId ? (
        <View className="flex-row mt-4 mb-2">
          <Button
            label="Edit Profile"
            className="mr-2 flex-1"
            onPress={() => navigate("EditProfile")}
          />
          <Button
            className="flex-1"
            label="Logout"
            onPress={() => Auth.signOut()}
          />
        </View>
      ) : null}
    </View>
  );
};
