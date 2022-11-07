import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import { Auth } from "aws-amplify";
import React from "react";
import CustomButton from "../custom-button";

const SocialSignInButtons = () => {
  const onSignInFacebook = async () => {
    try {
      const result = await Auth.federatedSignIn({
        provider: CognitoHostedUIIdentityProvider.Facebook,
      });
      console.log("result", result);
    } catch (error) {
      alert((error as Error)?.message);
    }
  };

  const onSignInGoogle = async () => {
    try {
      const result = await Auth.federatedSignIn({
        provider: CognitoHostedUIIdentityProvider.Google,
      });
      console.log("result", result);
    } catch (error) {
      alert((error as Error)?.message);
    }
  };

  const onSignInApple = () => {
    console.warn("onSignInApple");
  };

  return (
    <>
      <CustomButton
        text="Sign In with Facebook"
        onPress={onSignInFacebook}
        bgColor="#E7EAF4"
        fgColor="#4765A9"
      />
      <CustomButton
        text="Sign In with Google"
        onPress={onSignInGoogle}
        bgColor="#FAE9EA"
        fgColor="#DD4D44"
      />
      <CustomButton
        text="Sign In with Apple"
        onPress={onSignInApple}
        bgColor="#e3e3e3"
        fgColor="#363636"
      />
    </>
  );
};

export default SocialSignInButtons;
