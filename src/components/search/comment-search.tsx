import { View, FlatList } from "react-native";
import comments from "../../mocks/comments.json";
import { Input } from "../../screen/comment/input";
import { Comment } from "../comment";

export const CommentSearch = () => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={comments}
        renderItem={({ item }) => <Comment comment={item} includeDetails />}
        style={{ padding: 10 }}
      />
      <Input />
    </View>
  );
};
