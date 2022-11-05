import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
//@ts-ignore
import Logo from "../../assets/images/logo.png";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";
import FormInput from "../../components/form-input";
import CustomButton from "../../components/custom-button";
import SocialSignInButtons from "../../components/social-sign-in-buttons";
import { useAuthContext } from "../../contexts/auth-context";

type SignInData = {
  username: string;
  password: string;
};

export const SignInScreen = () => {
  const { height } = useWindowDimensions();
  const { navigate } = useNavigation();
  const { setUser } = useAuthContext();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInData>();

  const onSignInPressed = handleSubmit(async (data) => {
    try {
      console.log("data", data);
      const result = await Auth.signIn(data);
      setUser(result);
      console.log("result", result);
    } catch (error) {
      const err = error as Error;
      if (err?.name === "UserNotConfirmedException") {
        navigate("ConfirmEmail", { username: data.username });
        return;
      }
      alert(err?.message);
    }
  });

  const onForgotPasswordPressed = () => {
    navigate("ForgotPassword");
  };

  const onSignUpPress = () => {
    navigate("SignUp");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />

        <FormInput
          name="username"
          placeholder="Username"
          control={control}
          rules={{ required: "Username is required" }}
        />

        <FormInput
          name="password"
          placeholder="Password"
          secureTextEntry
          control={control}
          rules={{
            required: "Password is required",
            minLength: {
              value: 3,
              message: "Password should be minimum 3 characters long",
            },
          }}
        />

        <CustomButton
          text={isSubmitting ? "Loading..." : "Sign In"}
          onPress={onSignInPressed}
        />

        <CustomButton
          text="Forgot password?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />

        <SocialSignInButtons />

        <CustomButton
          text="Don't have an account? Create one"
          onPress={onSignUpPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 200,
  },
});
