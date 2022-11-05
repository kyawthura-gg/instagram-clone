import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Control, Controller, Path } from "react-hook-form";

interface ICustomInput<ContentType> {
  control: Control<ContentType, object>;
  name: Path<ContentType>;
  rules?: {};
  placeholder?: string;
  secureTextEntry?: boolean;
}

function CustomInput<ContentType>({
  control,
  name,
  rules = {},
  placeholder = "",
  secureTextEntry = false,
}: ICustomInput<ContentType>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <View
            style={[
              styles.container,
              { borderColor: error ? "red" : "#e8e8e8" },
            ]}
          >
            <TextInput
              value={value as string}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={styles.input}
              secureTextEntry={secureTextEntry}
            />
          </View>
          {error && (
            <Text style={{ color: "red", alignSelf: "stretch" }}>
              {error.message || "Error"}
            </Text>
          )}
        </>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",

    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    height: 50,
  },
});

export default CustomInput;
