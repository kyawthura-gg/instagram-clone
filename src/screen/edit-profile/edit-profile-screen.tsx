import React, { useState } from "react";
import { Control, Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  DeleteUserMutationVariables,
  GetUserQuery,
  GetUserQueryVariables,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  User as UserType,
  UserByUsernameQuery,
  UserByUsernameQueryVariables,
} from "../../API";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { getUser, userByUsername } from "../../apollo/user-queries";
import { useAuthContext } from "../../contexts/auth-context";
import { ErrorMessage } from "../../components/core/error-message";
import { deleteUser, updateUser } from "../../apollo/user-mutations";
import { RootStackScreenProps } from "../../navigators";
import { Auth } from "aws-amplify";

type IEditableFields = "name" | "username" | "website" | "bio";

type IEditable = Pick<UserType, IEditableFields>;

interface IFormInput extends TextInputProps {
  label: string;
  control: Control<IEditable, object>;
  name: IEditableFields;
  rules?: object;
}
const FormInput = ({
  label,
  control,
  name,
  className = "",
  rules = {},
  ...otherProps
}: IFormInput) => (
  <Controller
    control={control}
    name={name}
    rules={rules}
    render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
      <View className="flex-row mb-3">
        <Text className="w-20 mt-3">{label}</Text>
        <View className="flex-1">
          <TextInput
            value={value ?? ""}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={label}
            className={`border-b-border border-b-[1px] rounded-none flex-1 px-2 py-2 ml-1 ${className} ${
              error ? "border-error" : ""
            }`}
            {...otherProps}
          />
          {error ? (
            <Text className="text-error ml-1 mt-[1]">
              {error.message || "Error"}
            </Text>
          ) : null}
        </View>
      </View>
    )}
  />
);
export const EditProfileScreen = ({
  navigation: { goBack, canGoBack },
}: RootStackScreenProps<"EditProfile">) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const { control, handleSubmit, setValue } = useForm<IEditable>();
  const { userId, user: authUser } = useAuthContext();
  const { data, loading, error } = useQuery<
    GetUserQuery,
    GetUserQueryVariables
  >(getUser, {
    variables: { id: userId },
    onCompleted: (data) => {
      const user = data.getUser;
      setValue("name", user.name);
      setValue("username", user.username);
      setValue("bio", user.bio);
      setValue("website", user.website);
    },
  });
  const user = data?.getUser;

  const [updateMutation, { loading: updating }] = useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(updateUser);

  const [deleteUserMutation, { loading: deleting }] = useMutation<
    any,
    DeleteUserMutationVariables
  >(deleteUser);

  const [getUserByUsername] = useLazyQuery<
    UserByUsernameQuery,
    UserByUsernameQueryVariables
  >(userByUsername);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if ("uri" in result && !result.cancelled) {
      setSelectedPhoto(result.uri);
    }
  };

  const onSubmit = async (formData: IEditable) => {
    await updateMutation({
      variables: {
        input: { ...formData, id: userId, _version: user._version },
      },
    });
    if (canGoBack()) {
      goBack();
    }
  };

  const handleDelete = () => {
    Alert.alert("Delete User", "Are you sure want to delete permanently?", [
      {
        text: "Cancel",
      },
      {
        text: "Yes",
        style: "destructive",
        onPress: onDelete,
      },
    ]);
  };

  const onDelete = async () => {
    await deleteUserMutation({
      variables: { input: { id: userId, _version: user._version } },
    });
    authUser.deleteUser((response) => {
      console.log("delete user:", response);
      Auth.signOut();
    });
  };

  const validateUsername = async (username: string) => {
    try {
      const { data } = await getUserByUsername({ variables: { username } });
      const usernames = data?.userByUsername?.items;
      if (usernames.length === 0 || usernames?.[0]?.id === userId) {
        console.log("not taken");
        return true;
      }
    } catch (error) {
      console.log("err", error);
    }
    console.log("taken");

    return "Username already taken";
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return (
      <ErrorMessage title="Error fetching user" message={error?.message} />
    );
  }

  return (
    <View className="flex-1 px-3">
      <Image
        source={{
          uri: selectedPhoto ?? user.image,
        }}
        className="w-[30%] aspect-square rounded-full self-center"
      />
      <Text
        onPress={handlePickImage}
        className="mt-2 text-blue-500 font-semibold text-center mb-4"
      >
        Change profile photo
      </Text>
      <FormInput
        control={control}
        rules={{ required: "Name required" }}
        name="name"
        label="Name"
      />
      <FormInput
        control={control}
        rules={{ required: "UserName required", validate: validateUsername }}
        name="username"
        label="Username"
      />
      <FormInput control={control} name="website" label="Website" />
      <FormInput
        control={control}
        rules={{ required: "Bio required" }}
        name="bio"
        label="Bio"
        multiline
      />
      <Text
        onPress={handleSubmit(onSubmit)}
        className="mt-4 text-blue-500 font-semibold text-center mb-4"
      >
        {updating ? "Updating ..." : "Submit"}
      </Text>

      <Text
        onPress={handleDelete}
        className="mt-4 text-red-500 font-semibold text-center mb-4"
      >
        {deleting ? "Deleting ..." : "DELETE"}
      </Text>
    </View>
  );
};
