import React, { useState } from "react";
import { Control, Controller, useForm } from "react-hook-form";
import { Image, Text, TextInput, TextInputProps, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { IUser } from "../../interfaces/user.interface";
import user from "../../mocks/user.json";

type IEditableFields = "name" | "username" | "website" | "bio";

type IEditable = Pick<IUser, IEditableFields>;

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
            value={value}
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
export const EditProfileScreen = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const { control, handleSubmit } = useForm<IEditable>({
    defaultValues: {
      name: user.name,
      bio: user.bio,
      username: user.username,
      website: "",
    },
  });

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

  const onSubmit = (data: IEditable) => console.log(data);
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
        rules={{ required: "UserName required" }}
        name="username"
        label="Username"
      />
      <FormInput
        control={control}
        rules={{ required: "Website required" }}
        name="website"
        label="Website"
      />
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
        Submit
      </Text>
    </View>
  );
};