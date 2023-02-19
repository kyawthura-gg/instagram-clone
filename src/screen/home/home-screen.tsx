import { useRef, useState } from "react";
import { ActivityIndicator, FlatList, ViewToken } from "react-native";
import { FeedPost } from "../../components/feed-post";
import { useQuery } from "@apollo/client";
import {
  ModelSortDirection,
  PostsByDateQuery,
  PostsByDateQueryVariables,
} from "../../API";
import { ErrorMessage } from "../../components/core/error-message";
import { postsByDate } from "../../apollo/post-queries";

const viewabilityConfig = {
  itemVisiblePercentThreshold: 51,
};

export const HomeScreen = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const { data, loading, error, refetch, fetchMore } = useQuery<
    PostsByDateQuery,
    PostsByDateQueryVariables
  >(postsByDate, {
    variables: {
      type: "POST",
      sortDirection: ModelSortDirection.DESC,
      limit: 6,
    },
  });
  const posts = (data?.postsByDate?.items || []).filter(
    (post) => !post?._deleted,
  );
  const nextToken = data?.postsByDate?.nextToken;

  const loadMore = async () => {
    if (!nextToken || isFetchingMore) {
      return;
    }
    setIsFetchingMore(true);
    await fetchMore({ variables: { nextToken } });
    setIsFetchingMore(false);
  };

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

  return (
    <FlatList
      className="bg-white"
      onRefresh={refetch}
      refreshing={loading}
      data={posts}
      renderItem={({ item }) =>
        item ? <FeedPost post={item} isVisible={item.id === activeId} /> : null
      }
      showsVerticalScrollIndicator={false}
      viewabilityConfig={viewabilityConfig}
      onViewableItemsChanged={onViewableItemsChanged.current}
      onEndReached={loadMore}
    />
  );
};
