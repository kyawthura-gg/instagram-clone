import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import FormInput from "../../components/form-input";
import CustomButton from "../../components/custom-button";
import { Auth } from "aws-amplify";

type NewPasswordType = {
  email: string;
  code: string;
  password: string;
};

export const NewPasswordScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NewPasswordType>();

  const navigation = useNavigation();

  const onSubmitPressed = handleSubmit(async ({ code, password, email }) => {
    try {
      await Auth.forgotPasswordSubmit(email, code, password);
      navigation.navigate("SignIn");
    } catch (error) {
      alert((error as Error)?.message);
    }
  });

  const onSignInPress = () => {
    navigation.navigate("SignIn");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Reset your password</Text>

        <FormInput
          placeholder="Email"
          name="email"
          control={control}
          rules={{ required: "Email is required" }}
        />

        <FormInput
          placeholder="Code"
          name="code"
          control={control}
          rules={{ required: "Code is required" }}
        />

        <FormInput
          placeholder="Enter your new password"
          name="password"
          control={control}
          secureTextEntry
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password should be at least 8 characters long",
            },
          }}
        />

        <CustomButton
          text={isSubmitting ? "Loading" : "Submit"}
          onPress={onSubmitPressed}
        />

        <CustomButton
          text="Back to Sign in"
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
    color: "#051C60",
    margin: 10,
  },
  text: {
    color: "gray",
    marginVertical: 10,
  },
  link: {
    color: "#FDB075",
  },
});
