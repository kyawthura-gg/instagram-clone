import React from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import { Comment } from "../../components/comment";
import comments from "../../mocks/comments.json";
import { Input } from "./input";

export const CommentScreen = () => {
  return (
    <>
      <FlatList
        className="grow px-3"
        data={comments}
        renderItem={({ item }) => <Comment comment={item} showDetails />}
      />
      <Input placeholder="testing" />
    </>
  );
};
