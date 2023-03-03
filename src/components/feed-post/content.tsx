import { View, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Carousel } from "../carousel";
import { VideoPlayer } from "../video-player";
import { type Post } from "../../API";
import { Storage } from "aws-amplify";
import clsx from "clsx";

interface IContent {
  post: Post;
  isVisible: boolean;
}

export const Content = ({ post, isVisible }: IContent) => {
  const [imageUri, setImageUri] = useState<string>();
  const [imagesUri, setImagesUri] = useState<string[] | null>(null);
  const [videoUri, setVideoUri] = useState<string>();

  useEffect(() => {
    async function getStorage() {
      if (typeof post?.image === "string") {
        const uri = await Storage.get(post.image);
        if (!ignore) {
          setImageUri(uri);
        }
      } else if (post.images != null && post.images?.length > 0) {
        const uris = await Promise.all(
          post.images.map(async (img) => await Storage.get(img))
        );
        if (!ignore) {
          setImagesUri(uris);
        }
      } else if (typeof post.video === "string") {
        const uri = await Storage.get(post.video);
        if (!ignore) {
          setVideoUri(uri);
        }
        setVideoUri(uri);
      }
    }
    let ignore = false;
    getStorage();

    return () => {
      ignore = true;
    };
  }, [post.image, post.images, post.video]);

  if (typeof post.image === "string") {
    const hasImage = typeof imageUri === "string";
    return (
      <Image
        source={
          hasImage
            ? {
                uri: imageUri,
              }
            : require("../../assets/images/empty-image.png")
        }
        className={clsx("w-full h-[300px]", !hasImage && "bg-gray-300")}
      />
    );
  } else if (imagesUri != null && imagesUri?.length > 0) {
    return <Carousel images={imagesUri} />;
  } else if (typeof videoUri === "string") {
    return <VideoPlayer uri={videoUri} shouldPlay={isVisible} />;
  }

  return (
    <View>
      <ActivityIndicator />
    </View>
  );
};
