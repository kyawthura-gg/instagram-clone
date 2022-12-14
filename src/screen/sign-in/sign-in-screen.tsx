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

type SignInData = {
  email: string;
  password: string;
};

export const SignInScreen = () => {
  const { height } = useWindowDimensions();
  const { navigate } = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInData>();

  const onSignInPressed = handleSubmit(async ({ email, password }) => {
    try {
      await Auth.signIn({
        username: email,
        password,
      });
    } catch (error) {
      const err = error as Error;
      if (err?.name === "UserNotConfirmedException") {
        navigate("ConfirmEmail", { email });
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
          name="email"
          placeholder="Email"
          control={control}
          rules={{ required: "Email is required" }}
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
