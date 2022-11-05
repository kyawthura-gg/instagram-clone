import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import Logo from "../../assets/images/logo.png";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import FormInput from "../../components/form-input";
import CustomButton from "../../components/custom-button";
import SocialSignInButtons from "../../components/social-sign-in-buttons";

type SignInData = {
  username: string;
  password: string;
};

export const SignInScreen = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const { control, handleSubmit } = useForm<SignInData>();

  const onSignInPressed = (data: SignInData) => {
    console.log(data);
    // validate user
    // navigation.navigate('Home');
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate("ForgotPassword");
  };

  const onSignUpPress = () => {
    navigation.navigate("SignUp");
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

        <CustomButton text="Sign In" onPress={handleSubmit(onSignInPressed)} />

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
