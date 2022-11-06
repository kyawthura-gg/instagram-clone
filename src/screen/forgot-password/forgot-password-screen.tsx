import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useForm } from "react-hook-form";
import FormInput from "../../components/form-input";
import CustomButton from "../../components/custom-button";
import { Auth } from "aws-amplify";

type ForgotPasswordData = {
  email: string;
};

export const ForgotPasswordScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ForgotPasswordData>();
  const navigation = useNavigation();

  const onSendPressed = handleSubmit(async ({ email }) => {
    try {
      const result = await Auth.forgotPassword(email);
      alert(
        `The code has been sent to ${result?.CodeDeliveryDetails?.Destination}`,
      );
      navigation.navigate("NewPassword");
    } catch (error) {
      alert((error as Error)?.message);
    }
    // console.warn(data);
    // navigation.navigate("NewPassword");
  });

  const onSignInPress = () => {
    navigation.navigate("SignIn");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Reset your password</Text>

        <FormInput
          name="email"
          control={control}
          placeholder="Email"
          rules={{
            required: "Email is required",
          }}
        />

        <CustomButton
          text={isSubmitting ? "Loading..." : "Send"}
          onPress={onSendPressed}
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
