import { Amplify } from "aws-amplify";
import awsconfig from "./src/aws-exports";
import { SafeAreaView } from "react-native-safe-area-context";
import { withAuthenticator, AmplifyTheme } from "aws-amplify-react-native";
import { MainNavigator } from "./src/navigators";
import { colors } from "./src/theme";

Amplify.configure(awsconfig);
function App() {
  return (
    <SafeAreaView className="flex-1">
      <MainNavigator />
    </SafeAreaView>
  );
}

const signUpConfig = {
  hideAllDefaults: true,
  signUpFields: [
    {
      label: "Full Name",
      key: "name",
      required: true,
      displayOrder: 1,
      type: "string",
    },
    {
      label: "Email",
      key: "email",
      required: true,
      displayOrder: 2,
      type: "string",
    },
    {
      label: "Username",
      key: "username",
      required: true,
      displayOrder: 3,
      type: "string",
    },
    {
      label: "Password",
      key: "password",
      required: true,
      displayOrder: 4,
      type: "string",
    },
  ],
};

const theme = {
  ...AmplifyTheme,
  button: {
    ...AmplifyTheme.button,
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  buttonDisabled: {
    ...AmplifyTheme.buttonDisabled,
    backgroundColor: colors.primary,
    opacity: 0.7,
    borderRadius: 10,
  },
  sectionFooterLink: {
    ...AmplifyTheme.sectionFooterLink,
    color: colors.primary,
  },
};
export default withAuthenticator(App, {
  signUpConfig,
  theme,
});
