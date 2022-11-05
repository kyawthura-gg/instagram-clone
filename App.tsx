import { Amplify } from "aws-amplify";
import awsconfig from "./src/aws-exports";
import { SafeAreaView } from "react-native-safe-area-context";
import { MainNavigator } from "./src/navigators";
import { AuthContextProvider } from "./src/contexts/auth-context";

Amplify.configure(awsconfig);
function App() {
  return (
    <SafeAreaView className="flex-1">
      <AuthContextProvider>
        <MainNavigator />
      </AuthContextProvider>
    </SafeAreaView>
  );
}

export default App;
