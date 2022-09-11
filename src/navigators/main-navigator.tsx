import * as React from "react";
import { LinkingOptions, NavigationContainer } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { AppNavigators } from "./app-navigation";
import { RootStackParamList } from "./navigator-types";

const prefix = Linking.createURL("/");
const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [prefix, "instaclone://"],
  config: {
    initialRouteName: "Tab",
    screens: {
      Comment: "comments",
    },
  },
};

export const MainNavigator = () => {
  return (
    <NavigationContainer linking={linking}>
      <AppNavigators />
    </NavigationContainer>
  );
};
