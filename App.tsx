import { useRef, useState } from "react";
import { FlatList, SafeAreaView, ViewToken } from "react-native";
import { FeedPost } from "./src/components/feed";
import posts from "./src/mocks/posts.json";

const viewabilityConfig = {
  itemVisiblePercentThreshold: 51,
};

export default function App() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      setActiveId(viewableItems[0].item.id);
    },
  );

  return (
    <SafeAreaView>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <FeedPost post={item} isVisible={item.id === activeId} />
        )}
        showsVerticalScrollIndicator={false}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged.current}
      />
    </SafeAreaView>
  );
}
