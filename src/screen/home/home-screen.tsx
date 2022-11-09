import { API, graphqlOperation } from "aws-amplify";
import { useEffect, useRef, useState } from "react";
import { FlatList, ViewToken } from "react-native";
import { Post } from "../../API";
import { FeedPost } from "../../components/feed-post";
// import { listPosts } from "../../graphql/queries";

const viewabilityConfig = {
  itemVisiblePercentThreshold: 51,
};

const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        description
        image
        images
        video
        nofComments
        nofLikes
        userID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        User {
          id
          name
          username
          image
        }
        Comments {
          items {
            id
            comment
            User {
              id
              name
              username
            }
          }
        }
      }
      nextToken
      startedAt
    }
  }
`;

export const HomeScreen = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [posts, setPosts] = useState([]);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      setActiveId(viewableItems[0].item.id);
    },
  );

  const fetchPosts = async () => {
    const response = await API.graphql(graphqlOperation(listPosts));
    setPosts(response?.data?.listPosts?.items as Post[]);
    console.log("response", response?.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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
