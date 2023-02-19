import React from "react";
import { Text } from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
  renderers,
} from "react-native-popup-menu";
import { Entypo } from "@expo/vector-icons";
import { Alert } from "react-native";
import { useMutation } from "@apollo/client";
import { deletePost } from "../../apollo/post-mutations";
import {
  DeletePostMutation,
  DeletePostMutationVariables,
  Post as IPost,
} from "../../API";
import { useAuthContext } from "../../contexts/auth-context";
import { useNavigation } from "@react-navigation/native";

export const PostMenu = ({ post }: { post: IPost }) => {
  const { userId } = useAuthContext();
  const { navigate } = useNavigation();
  const isMyPost = userId === post.userID;
  const [doDeletePost] = useMutation<
    DeletePostMutation,
    DeletePostMutationVariables
  >(deletePost, {
    variables: { input: { id: post.id, _version: post._version } },
  });

  const navigateToEdit = () => navigate("UpdatePost", { id: post.id });

  const handleDelete = async () => {
    try {
      await doDeletePost();
    } catch (e) {
      Alert.alert("Failed to delete post", (e as Error).message);
    }
  };

  const handleDeleteAlert = () => {
    Alert.alert("Delete", "Are you sure want to Delete?", [
      {
        text: "Cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: handleDelete,
      },
    ]);
  };

  return (
    <Menu
      renderer={renderers.SlideInMenu}
      style={{
        marginLeft: "auto",
      }}
    >
      <MenuTrigger>
        <Entypo name="dots-three-horizontal" size={16} />
      </MenuTrigger>
      <MenuOptions>
        {isMyPost ? (
          <>
            <MenuOption onSelect={handleDeleteAlert}>
              <Text className="text-center text-lg p-2.5 text-red-500">
                Delete
              </Text>
            </MenuOption>
            <MenuOption onSelect={navigateToEdit}>
              <Text className="text-center text-lg p-2.5">Edit</Text>
            </MenuOption>
          </>
        ) : (
          <MenuOption onSelect={() => alert(`Reporting`)}>
            <Text className="text-center text-lg p-2.5">Report</Text>
          </MenuOption>
        )}
      </MenuOptions>
    </Menu>
  );
};
