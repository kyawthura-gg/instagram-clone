import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, View } from "react-native";
import { useAuthContext } from "../contexts/auth-context";
import { CommentScreen } from "../screen/comment";
import { ConfirmEmailScreen } from "../screen/confirm-email/confirm-email-screen";
import { EditProfileScreen } from "../screen/edit-profile";
import { ForgotPasswordScreen } from "../screen/forgot-password/forgot-password-screen";
import { NewPasswordScreen } from "../screen/new-password/new-password-screen";
import { ProfileScreen } from "../screen/profile";
import { SignInScreen } from "../screen/sign-in";
import { SignUpScreen } from "../screen/sign-up";
import { colors } from "../theme";
import { BottomTab } from "./bottom-tab";
import { RootStackParamList } from "./navigator-types";

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigators = () => {
  const { user } = useAuthContext();

  if (user === undefined) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator color={colors.primary} size={"small"} />
      </View>
    );
  }

  return (
    <RootStack.Navigator>
      {!user ? (
        <>
          {/* Start of auth */}
          <RootStack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{ headerShown: false }}
          />
          <RootStack.Screen name="SignUp" component={SignUpScreen} />
          <RootStack.Screen
            name="ConfirmEmail"
            component={ConfirmEmailScreen}
          />
          <RootStack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
          <RootStack.Screen name="NewPassword" component={NewPasswordScreen} />
          {/* End of auth */}
        </>
      ) : (
        <>
          <RootStack.Screen
            options={{ headerShown: false }}
            name="Tab"
            component={BottomTab}
          />
          <RootStack.Screen name="Comment" component={CommentScreen} />
          <RootStack.Screen name="Profile" component={ProfileScreen} />
          <RootStack.Screen name="EditProfile" component={EditProfileScreen} />
        </>
      )}
    </RootStack.Navigator>
  );
};
