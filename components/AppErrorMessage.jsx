import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/colors_font";

const AppErrorMessage = ({ error, visible }) => {
  if (!visible || !error) return null;
  return <Text style={styles.warningText}>{error}</Text>;
};

export default AppErrorMessage;

const styles = StyleSheet.create({
  warningText: {
    color: COLORS.errorText,
    fontSize: 12,
    textAlign: "center",
  },
});
