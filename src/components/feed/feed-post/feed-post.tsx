import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Entypo, AntDesign, Ionicons, Feather } from "@expo/vector-icons";
import { IFeedPost } from "./feed-post.props";
import { Comment } from "../comment";
import { DoublePress } from "../double-press/double-press";
import { colors } from "../../../theme";
import { Carousel } from "../../carousel";
import { VideoPlayer } from "../../video-player";

export const FeedPost = ({ post, isVisible }: IFeedPost) => {
  const [isLiked, setIsLiked] = useState(false);
  const [readMore, setReadMore] = useState(false);

  const toggleMore = () => setReadMore((r) => !r);
  const toggleLike = () => setIsLiked((l) => !l);

  console.log("isVisible", isVisible);

  let content = null;
  if (post.image) {
    content = (
      <DoublePress onDoublePress={toggleLike}>
        <Image
          className="w-full h-[300px] "
          source={{
            uri: post.image,
          }}
        />
      </DoublePress>
    );
  } else if (post.images) {
    content = <Carousel images={post.images} />;
  } else if (post.video) {
    content = <VideoPlayer uri={post.video} shouldPlay={isVisible} />;
  }

  return (
    <View className="mb-4">
      <View className="flex-row px-2 items-center mb-2">
        {/* Image */}
        <Image
          className="bg-purple-400 w-8 h-8 rounded-full"
          source={{ uri: post.user.image }}
        />
        <Text className="font-semibold ml-2">{post.user.username}</Text>
        <Entypo
          name="dots-three-horizontal"
          size={16}
          style={{
            marginLeft: "auto",
          }}
        />
      </View>
      {/* Image */}
      {content}
      <View className="flex-row mt-2 mx-2">
        <Pressable onPress={toggleLike}>
          <AntDesign
            name={isLiked ? "heart" : "hearto"}
            size={24}
            color={isLiked ? colors.accent : colors.black}
          />
        </Pressable>
        <Ionicons
          name="chatbubble-outline"
          size={24}
          style={{ marginLeft: 8 }}
        />
        <Feather name="send" size={24} style={{ marginLeft: 8 }} />
        <Feather name="bookmark" size={24} style={{ marginLeft: "auto" }} />
      </View>
      <View className="mx-2">
        <Text className="mt-1">
          Liked by <Text className="font-bold">tomato</Text> and{" "}
          <Text className="font-bold">{post.nofLikes} others</Text>
        </Text>
        <Text className="mt-1" numberOfLines={readMore ? 0 : 3}>
          <Text className="font-bold">{post.user.username} </Text>
          {post.description}
        </Text>
        <Text onPress={toggleMore} className="text-gray-400">
          {readMore ? "less" : "more"}
        </Text>
        <Text className="text-gray-500 mt-1">
          View all {post.nofComments} comments
        </Text>
        {post.comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}

        <Text className="text-gray-500 mt-1">{post.createdAt}</Text>
      </View>
    </View>
  );
};
