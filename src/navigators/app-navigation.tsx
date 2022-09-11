import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CommentScreen } from "../screen/comment";
import { BottomTab } from "./bottom-tab";
import { RootStackParamList } from "./navigator-types";

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigators = () => (
  <RootStack.Navigator initialRouteName="Tab">
    <RootStack.Screen
      options={{ headerShown: false }}
      name="Tab"
      component={BottomTab}
    />
    <RootStack.Screen name="Comment" component={CommentScreen} />
  </RootStack.Navigator>
);
