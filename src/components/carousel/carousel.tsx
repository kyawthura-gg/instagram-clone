import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  View,
  type ViewToken,
} from "react-native";

interface ICarousel {
  images: string[];
}

const { width } = Dimensions.get("window");
const viewabilityConfig = {
  itemVisiblePercentThreshold: 51,
};

export const Carousel = ({ images }: ICarousel) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onViewableItemsChanged = useRef(
    (params: { viewableItems: ViewToken[] }) => {
      if (params?.viewableItems?.[0]?.index) {
        setActiveIndex(params?.viewableItems[0].index);
      }
    }
  );

  return (
    <View>
      <FlatList
        data={images}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={{ width, aspectRatio: 1 }} />
        )}
        horizontal
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig}
        showsHorizontalScrollIndicator={false}
      />
      <View className="flex-row justify-center absolute inset-x-0 bottom-2">
        {images.map((_, i) => (
          <View
            key={i}
            className={`w-2.5 aspect-square bg-white mr-2 rounded-full ${
              activeIndex === i ? "bg-primary" : ""
            }`}
          />
        ))}
      </View>
    </View>
  );
};
