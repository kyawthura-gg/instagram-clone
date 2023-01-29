import { useRef, useState } from "react";
import { ActivityIndicator, FlatList, ViewToken } from "react-native";
import { FeedPost } from "../../components/feed-post";
import { useQuery } from "@apollo/client";
import { ListPostsQuery, ListPostsQueryVariables } from "../../API";
import { ErrorMessage } from "../../components/core/error-message";
import { listPosts } from "../../apollo/post-queries";

const viewabilityConfig = {
  itemVisiblePercentThreshold: 51,
};

export const HomeScreen = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { data, loading, error, refetch } = useQuery<
    ListPostsQuery,
    ListPostsQueryVariables
  >(listPosts);
  const posts = data?.listPosts?.items ?? [];

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      setActiveId(viewableItems[0].item.id);
    },
  );

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return (
      <ErrorMessage
        title={"Error fetching post"}
        message={error.message}
        onRetry={refetch}
      />
    );
  }

  console.log("data", data?.listPosts?.items);

  return (
    <FlatList
      className="bg-white"
      onRefresh={refetch}
      refreshing={loading}
      data={posts}
      renderItem={({ item }) => (
        <FeedPost post={item} isVisible={item.id === activeId} />
      )}
      showsVerticalScrollIndicator={false}
      viewabilityConfig={viewabilityConfig}
      onViewableItemsChanged={onViewableItemsChanged.current}
    />
  );
};
