import { useRef, useState } from "react";
import { FlatList, ViewToken } from "react-native";
import { FeedPost } from "../../components/feed-post";
import posts from "../../mocks/posts.json";

const viewabilityConfig = {
  itemVisiblePercentThreshold: 51,
};

export const HomeScreen = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      setActiveId(viewableItems[0].item.id);
    },
  );

  return (
    <FlatList
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
