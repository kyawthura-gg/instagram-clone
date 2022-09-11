import { SafeAreaView } from "react-native-safe-area-context";
import { MainNavigator } from "./src/navigators";
import { CommentScreen } from "./src/screen/comment";
import { EditProfileScreen } from "./src/screen/edit-profile";
import { HomeScreen } from "./src/screen/home";
import { ProfileScreen } from "./src/screen/profile";
import { UploadPostScreen } from "./src/screen/upload-post";

export default function App() {
  return (
    <SafeAreaView className="flex-1">
      <MainNavigator />
    </SafeAreaView>
  );
}
