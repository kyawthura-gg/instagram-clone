import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CommentScreen } from "../screen/comment";
import { ConfirmEmailScreen } from "../screen/confirm-email/confirm-email-screen";
import { ForgotPasswordScreen } from "../screen/forgot-password/forgot-password-screen";
import { NewPasswordScreen } from "../screen/new-password/new-password-screen";
import { SignInScreen } from "../screen/sign-in";
import { SignUpScreen } from "../screen/sign-up";
import { BottomTab } from "./bottom-tab";
import { RootStackParamList } from "./navigator-types";

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigators = () => (
  <RootStack.Navigator initialRouteName="SignIn">
    {/* Start of auth */}
    <RootStack.Screen
      name="SignIn"
      component={SignInScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen name="SignUp" component={SignUpScreen} />
    <RootStack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
    <RootStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <RootStack.Screen name="NewPassword" component={NewPasswordScreen} />
    {/* End of auth */}
    <RootStack.Screen
      options={{ headerShown: false }}
      name="Tab"
      component={BottomTab}
    />
    <RootStack.Screen name="Comment" component={CommentScreen} />
  </RootStack.Navigator>
);
