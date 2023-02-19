import { View, Image, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { Carousel } from "../carousel";
import { VideoPlayer } from "../video-player";
import { Post } from "../../API";
import { Storage } from "aws-amplify";
import clsx from "clsx";

interface IContent {
  post: Post;
  isVisible: boolean;
}

export const Content = ({ post, isVisible }: IContent) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  if (post.image) {
    return (
      <Image
        onLayout={async () => {
          //@ts-expect-error
          const uri = await Storage.get(post.image);
          setImageUri(uri);
        }}
        source={
          imageUri
            ? {
                uri: imageUri,
              }
            : require("../../assets/images/empty-image.png")
        }
        className={clsx("w-full h-[300px]", !imageUri && "bg-gray-300")}
      />
    );
  } else if (post.images) {
    return <Carousel images={post.images} />;
  } else if (post.video) {
    return <VideoPlayer uri={post.video} shouldPlay={isVisible} />;
  }

  return (
    <View>
      <ActivityIndicator />
    </View>
  );
};
