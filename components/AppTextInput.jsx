import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";

import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors_font";

const AppTextInput = ({
  noLabel = true,
  label,
  iconName,
  error,
  password,
  isMultiline = false,
  style,
  onFocus = () => {},
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  return (
    <View style={[styles.input, style]}>
      <Text style={styles.labelText}>{label}</Text>
      <View
        style={[
          styles.inputContainer,

          noLabel ? { marginVertical: -5 } : { marginVertical: 0 },
          isMultiline
            ? { height: 75, alignItems: "flex-start" }
            : { height: 40 },
          {
            borderColor: error
              ? COLORS.red
              : isFocused
              ? COLORS.primaryColor
              : COLORS.lightColor,
          },
        ]}
      >
        <AntDesign name={iconName} style={styles.icon} />

        <TextInput
          secureTextEntry={showPassword}
          style={styles.textInput}
          autoComplete="off"
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          {password && (
            <MaterialCommunityIcons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              style={styles.icon}
            />
          )}
        </TouchableOpacity>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  errorText: {
    color: COLORS.errorText,
    marginVertical: 5,
  },
  input: {
    marginBottom: 10,
  },
  labelText: {
    fontSize: 14,
    color: COLORS.inputLabelText,
  },
  icon: {
    fontSize: 20,
    color: COLORS.inputLabelText,
    marginRight: 10,
  },
  inputContainer: {
    width: "100%",
    backgroundColor: COLORS.inputBackgroundColor,
    flexDirection: "row",
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: COLORS.inputLabelText,
    borderRadius: 3,
    alignItems: "center",
  },
  textInput: {
    color: COLORS.inputLabelText,
    flex: 1,
    fontSize: 15,
  },
});
