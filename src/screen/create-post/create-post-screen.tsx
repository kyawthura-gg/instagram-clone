import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Image, TextInput, View } from "react-native";
import { CreatePostMutation, CreatePostMutationVariables } from "../../API";
import { createPost } from "../../apollo/post-mutations";
import { Button } from "../../components/button";
import { Carousel } from "../../components/carousel";
import { VideoPlayer } from "../../components/video-player";
import { useAuthContext } from "../../contexts/auth-context";
import { RootStackScreenProps } from "../../navigators";

export const CreatePostScreen = ({
  route: { params },
  navigation,
}: RootStackScreenProps<"CreatePost">) => {
  const { image, images, video } = params;
  const { userId } = useAuthContext();
  const [description, setDescription] = useState("");
  const [doCreatePost] = useMutation<
    CreatePostMutation,
    CreatePostMutationVariables
  >(createPost);

  const handleSubmit = async () => {
    if (!userId) {
      return;
    }
    const response = await doCreatePost({
      variables: {
        input: {
          description,
          image,
          images,
          video,
          nofComments: 0,
          nofLikes: 0,
          userID: userId,
        },
      },
    });
    navigation.popToTop();
    console.log("res", response);
  };

  let content = null;
  if (image) {
    content = (
      <Image
        className="w-full h-[300px] "
        source={{
          uri: image,
        }}
      />
    );
  } else if (images) {
    content = <Carousel images={images} />;
  } else if (video) {
    content = <VideoPlayer uri={video} />;
  }

  return (
    <View className="items-center">
      <View className="w-48 h-48">{content}</View>
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
