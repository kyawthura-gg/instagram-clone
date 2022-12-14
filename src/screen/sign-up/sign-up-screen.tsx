import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useForm } from "react-hook-form";
import FormInput from "../../components/form-input";
import CustomButton from "../../components/custom-button";
import SocialSignInButtons from "../../components/social-sign-in-buttons";
import { Auth } from "aws-amplify";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

type SignUpData = {
  name: string;
  email: string;
  password: string;
  passwordRepeat: string;
};

export const SignUpScreen = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<SignUpData>();
  const pwd = watch("password");
  const navigation = useNavigation();

  const onRegisterPressed = handleSubmit(async ({ name, email, password }) => {
    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: { name },
      });
      navigation.navigate("ConfirmEmail", { email });
    } catch (error) {
      alert((error as Error)?.message);
    }
  });

  const onSignInPress = () => {
    navigation.navigate("SignIn");
  };

  const onTermsOfUsePressed = () => {
    console.warn("onTermsOfUsePressed");
  };

  const onPrivacyPressed = () => {
    console.warn("onPrivacyPressed");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title} className="text-black">
          Create an account
        </Text>

        <FormInput
          name="name"
          control={control}
          placeholder="Full name"
          rules={{
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Name should be at least 3 characters long",
            },
            maxLength: {
              value: 24,
              message: "Name should be max 24 characters long",
            },
          }}
        />

        <FormInput
          name="email"
          control={control}
          placeholder="Email"
          rules={{
            required: "Email is required",
            pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
          }}
        />
        <FormInput
          name="password"
          control={control}
          placeholder="Password"
          secureTextEntry
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password should be at least 8 characters long",
            },
          }}
        />
        <FormInput
          name="passwordRepeat"
          control={control}
          placeholder="Repeat Password"
          secureTextEntry
          rules={{
            validate: (value: string) =>
              value === pwd || "Password do not match",
          }}
        />

        <CustomButton
          text={isSubmitting ? "Loading" : "Register"}
          onPress={onRegisterPressed}
        />

        <Text style={styles.text}>
          By registering, you confirm that you accept our{" "}
          <Text className="text-primary" onPress={onTermsOfUsePressed}>
            Terms of Use
          </Text>{" "}
          and{" "}
          <Text className="text-primary" onPress={onPrivacyPressed}>
            Privacy Policy
          </Text>
        </Text>

        <SocialSignInButtons />

        <CustomButton
          text="Have an account? Sign in"
          onPress={onSignInPress}
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 10,
  },
  text: {
    color: "gray",
    marginVertical: 10,
  },
});
