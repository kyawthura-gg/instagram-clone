import { SafeAreaView } from "react-native";
import { CommentScreen } from "./src/screen/comment";
import { EditProfileScreen } from "./src/screen/edit-profile";
import { HomeScreen } from "./src/screen/home";
import { ProfileScreen } from "./src/screen/profile";

export default function App() {
  return (
    <SafeAreaView className="flex-1">
      {/* <ProfileScreen /> */}
      {/* <HomeScreen /> */}
      <EditProfileScreen />
    </SafeAreaView>
  );
}
