import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useForm } from "react-hook-form";
import FormInput from "../../components/form-input";
import CustomButton from "../../components/custom-button";
import { RootStackScreenProps } from "../../navigators";

type ConfirmEmailData = {
  username: string;
  code: string;
};

export const ConfirmEmailScreen = ({
  route,
}: RootStackScreenProps<"ConfirmEmail">) => {
  const { control, handleSubmit } = useForm<ConfirmEmailData>({
    defaultValues: { username: route.params?.username },
  });

  const navigation = useNavigation();

  const onConfirmPressed = (data: ConfirmEmailData) => {
    console.warn(data);
    navigation.navigate("SignIn");
  };

  const onSignInPress = () => {
    navigation.navigate("SignIn");
  };

  const onResendPress = () => {
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

        <CustomButton text="Confirm" onPress={handleSubmit(onConfirmPressed)} />

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
