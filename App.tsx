import { SafeAreaView } from "react-native";
import { CommentScreen } from "./src/screen/comment";
import { HomeScreen } from "./src/screen/home";

export default function App() {
  return (
    <SafeAreaView className="flex-1">
      <CommentScreen />
      {/* <HomeScreen /> */}
    </SafeAreaView>
  );
}
