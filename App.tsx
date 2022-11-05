import { Amplify } from "aws-amplify";
import awsconfig from "./src/aws-exports";
import { SafeAreaView } from "react-native-safe-area-context";
import { MainNavigator } from "./src/navigators";

Amplify.configure(awsconfig);
function App() {
  return (
    <SafeAreaView className="flex-1">
      <MainNavigator />
    </SafeAreaView>
  );
}

export default App;
