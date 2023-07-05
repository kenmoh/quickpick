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
  password,
  marginBtm = 1,
  isMultiline = false,
  style,
  inputHeight = 50,
  multiLineHeighy = 75,
  paddingHorizontal = 10,
  containerBg = COLORS.inputBackgroundColor,
  isEditable = false,
  onFocus = () => {},
  ...props
}) => {
  // const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  return (
    <View style={[styles.input, style]}>
      <Text style={styles.labelText}>{label}</Text>
      <View
        style={[
          styles.inputContainer,

          noLabel ? { marginVertical: marginBtm } : { marginVertical: 0 },
          isMultiline
            ? { height: multiLineHeighy, alignItems: "flex-start" }
            : { height: inputHeight },
          {
            paddingHorizontal,
          },
          isEditable ? { backgroundColor: containerBg } : "#767577",
          // { marginBottom: marginBtm },
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
            // setIsFocused(true);
          }}
          // onBlur={() => setIsFocused(false)}
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
      {/* {error && <Text style={styles.errorText}>{error}</Text>} */}
    </View>
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  errorText: {
    color: COLORS.errorText,
  },
  input: {
    marginBottom: 3,
  },
  labelText: {
    fontSize: 14,
    color: COLORS.inputLabelText,
    marginTop: 12,
    marginBottom: 7,
  },
  icon: {
    fontSize: 20,
    color: COLORS.inputLabelText,
    marginRight: 10,
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    borderWidth: 0.5,
    borderColor: COLORS.inputLabelText,
    borderRadius: 3,
    alignItems: "center",
  },
  textInput: {
    color: COLORS.darkText,
    flex: 1,
    fontSize: 15,
  },
});
