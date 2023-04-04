import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../constants/colors_font";

const InputErrorMessage = ({ error }) => {
  return (
    <View>
      <Text style={styles.error}>{error}</Text>
    </View>
  );
};

export default InputErrorMessage;

const styles = StyleSheet.create({
  error: {
    color: COLORS.errorText,
    fontSize: 12,
  },
});
