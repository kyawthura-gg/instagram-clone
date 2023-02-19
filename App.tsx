import "react-native-get-random-values";
import { Amplify } from "aws-amplify";
import awsconfig from "./src/aws-exports";
import { SafeAreaView } from "react-native-safe-area-context";
import * as WebBrowser from "expo-web-browser";
import { MainNavigator } from "./src/navigators";
import { AuthContextProvider } from "./src/contexts/auth-context";
import { Linking, Platform } from "react-native";
import { Client } from "./src/apollo/client";
import { MenuProvider } from "react-native-popup-menu";

async function urlOpener(url: string, redirectUrl: string) {
  const result = await WebBrowser.openAuthSessionAsync(url, redirectUrl);

  if (result.type === "success" && Platform.OS === "ios") {
    WebBrowser.dismissBrowser();
    return Linking.openURL(result.url);
  }
}

Amplify.configure({
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    urlOpener,
  },
});

function App() {
  return (
    <SafeAreaView className="flex-1">
      <MenuProvider>
        <AuthContextProvider>
          <Client>
            <MainNavigator />
          </Client>
        </AuthContextProvider>
      </MenuProvider>
    </SafeAreaView>
  );
}

export default App;
