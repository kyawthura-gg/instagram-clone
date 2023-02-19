import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { AntDesign, Ionicons, Feather } from "@expo/vector-icons";
import { IFeedPost } from "./feed-post.props";
import { Comment } from "../comment";
import { DoublePress } from "../double-press";
import { colors } from "../../theme";
import { Carousel } from "../carousel";
import { VideoPlayer } from "../video-player";
import { useNavigation } from "@react-navigation/native";
import { PostMenu } from "./post-menu";
import useLikeService from "../../hooks/useLikeServices";
import dayjs from "dayjs";
import { Avatar } from "../avatar";
import { Content } from "./content";

export const FeedPost = ({ post, isVisible }: IFeedPost) => {
  const { navigate } = useNavigation();
  const [readMore, setReadMore] = useState(false);
  const { toggleLike, isLiked } = useLikeService(post);
  const postLikes = post?.Likes?.items.filter((like) => !like?._deleted) || [];

  const toggleMore = () => setReadMore((r) => !r);

  const navigateToLikes = () => {
    navigate("PostLikes", { id: post.id });
  };

  const navigateToUser = () =>
    post.User && navigate("Profile", { id: post.User.id });

  return (
    <View className="mb-4">
      <View className="flex-row px-2 items-center mb-2">
        {/* Image */}
        <Pressable onPress={navigateToUser} className="flex-row items-center">
          <Avatar src={post?.User?.image} size={32} />
          <Text className="font-semibold ml-2">{post.User?.username}</Text>
        </Pressable>
        <PostMenu post={post} />
      </View>

      <DoublePress onDoublePress={toggleLike}>
        <Content post={post} isVisible={isVisible} />
      </DoublePress>
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
        {postLikes.length === 0 ? (
          <Text className="mt-1">Be the first to like the post</Text>
        ) : (
          <Text className="mt-1" onPress={navigateToLikes}>
            Liked by{" "}
            <Text className="font-bold">{postLikes[0]?.User?.username}</Text>
            {postLikes.length > 1 && (
              <>
                {" "}
                and{" "}
                <Text className="font-bold">{post.nofLikes - 1} others</Text>
              </>
            )}
          </Text>
        )}
        <Text className="mt-1" numberOfLines={readMore ? 0 : 3}>
          <Text className="font-bold">{post.User?.username} </Text>
          {post.description}
        </Text>
        <Text onPress={toggleMore} className="text-gray-400">
          {readMore ? "less" : "more"}
        </Text>
        <Text
          onPress={() => navigate("Comment", { postId: post.id })}
          className="text-gray-500 mt-1"
        >
          View all {post.nofComments} comments
        </Text>
        {post?.Comments?.items
          ?.slice(0, 2)
          .map(
            (comment) =>
              comment && <Comment key={comment.id} comment={comment} />,
          )}

        <Text className="text-gray-500 mt-1">
          {dayjs(post.createdAt).fromNow()}
        </Text>
      </View>
    </View>
  );
};
