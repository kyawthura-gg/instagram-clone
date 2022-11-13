import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { CommentSearch, UserSearch } from "../../components/search";
import { colors } from "../../theme/colors";

const Tab = createMaterialTopTabNavigator();

export const SearchScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: colors.primary },
      }}
    >
      <Tab.Screen name="Users" component={UserSearch} />
      <Tab.Screen name="Posts" component={CommentSearch} />
    </Tab.Navigator>
  );
};
