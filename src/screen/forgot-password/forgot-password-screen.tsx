import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useForm } from "react-hook-form";
import FormInput from "../../components/form-input";
import CustomButton from "../../components/custom-button";

type ForgotPasswordData = {
  username: string;
};

export const ForgotPasswordScreen = () => {
  const { control, handleSubmit } = useForm<ForgotPasswordData>();
  const navigation = useNavigation();

  const onSendPressed = (data: ForgotPasswordData) => {
    console.warn(data);
    navigation.navigate("NewPassword");
  };

  const onSignInPress = () => {
    navigation.navigate("SignIn");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Reset your password</Text>

        <FormInput
          name="username"
          control={control}
          placeholder="Username"
          rules={{
            required: "Username is required",
          }}
        />

        <CustomButton text="Send" onPress={handleSubmit(onSendPressed)} />

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
