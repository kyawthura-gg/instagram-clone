import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useForm } from "react-hook-form";
import FormInput from "../../components/form-input";
import CustomButton from "../../components/custom-button";
import { RootStackScreenProps } from "../../navigators";
import { Auth } from "aws-amplify";

type ConfirmEmailData = {
  username: string;
  code: string;
};

export const ConfirmEmailScreen = ({
  route,
}: RootStackScreenProps<"ConfirmEmail">) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<ConfirmEmailData>({
    defaultValues: { username: route.params?.username },
  });

  const usr = watch("username");

  const navigation = useNavigation();

  const onConfirmPressed = handleSubmit(async ({ username, code }) => {
    try {
      await Auth.confirmSignUp(username, code);
    } catch (error) {
      alert((error as Error)?.message);
    }
    // navigation.navigate("SignIn");
  });

  const onSignInPress = () => {
    navigation.navigate("SignIn");
  };

  const onResendPress = async () => {
    try {
      await Auth.resendSignUp(usr);
      alert("Check your email");
    } catch (error) {
      alert((error as Error)?.message);
    }
    console.warn("onResendPress");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Confirm your email</Text>

        <FormInput
          name="username"
          control={control}
          placeholder="Username"
          rules={{
            required: "Username is required",
          }}
        />

        <FormInput
          name="code"
          control={control}
          placeholder="Enter your confirmation code"
          rules={{
            required: "Confirmation code is required",
          }}
        />

        <CustomButton
          text={isSubmitting ? "Loading..." : "Confirm"}
          onPress={onConfirmPressed}
        />

        <CustomButton
          text="Resend code"
          onPress={onResendPress}
          type="SECONDARY"
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
