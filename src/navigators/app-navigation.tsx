import { useQuery } from "@apollo/client";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, View } from "react-native";
import { GetUserQuery, GetUserQueryVariables } from "../API";
import { getUser } from "../apollo/user-queries";
import { useAuthContext } from "../contexts/auth-context";
import { CommentScreen } from "../screen/comment";
import { ConfirmEmailScreen } from "../screen/confirm-email/confirm-email-screen";
import { EditProfileScreen } from "../screen/edit-profile";
import { ForgotPasswordScreen } from "../screen/forgot-password/forgot-password-screen";
import { NewPasswordScreen } from "../screen/new-password/new-password-screen";
import { CreatePostScreen } from "../screen/create-post";
import { ProfileScreen } from "../screen/profile";
import { SignInScreen } from "../screen/sign-in";
import { SignUpScreen } from "../screen/sign-up";
import { colors } from "../theme";
import { BottomTab } from "./bottom-tab";
import { RootStackParamList } from "./navigator-types";
import { UpdatePostScreen } from "../screen/update-post";
import { PostLikesScreen } from "../screen/post-like/post-like";

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigators = () => {
  const { user: authUser, userId } = useAuthContext();
  const { data, loading } = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {
      variables: { id: userId },
    },
  );
  const user = data?.getUser;

  if (authUser === undefined || loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator color={colors.primary} size={"small"} />
      </View>
    );
  }
  let stackScreens = null;

  if (!authUser) {
    stackScreens = (
      <>
        {/* Start of auth */}
        <RootStack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen name="SignUp" component={SignUpScreen} />
        <RootStack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
        <RootStack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
        />
        <RootStack.Screen name="NewPassword" component={NewPasswordScreen} />
        {/* End of auth */}
      </>
    );
  } else if (!user?.username) {
    stackScreens = (
      <RootStack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ title: "Setup Profile" }}
      />
    );
  } else {
    stackScreens = (
      <>
        <RootStack.Screen
          options={{ headerShown: false }}
          name="Tab"
          component={BottomTab}
        />
        <RootStack.Screen name="Comment" component={CommentScreen} />
        <RootStack.Screen name="Profile" component={ProfileScreen} />
        <RootStack.Screen name="EditProfile" component={EditProfileScreen} />
        <RootStack.Screen name="CreatePost" component={CreatePostScreen} />
        <RootStack.Screen name="UpdatePost" component={UpdatePostScreen} />
        <RootStack.Screen
          name="PostLikes"
          component={PostLikesScreen}
          options={{ title: "Post Likes" }}
        />
      </>
    );
  }

  return <RootStack.Navigator>{stackScreens}</RootStack.Navigator>;
};
