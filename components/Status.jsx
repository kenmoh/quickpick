import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../constants/colors_font";

const Status = ({ text, textColor, backgroundColor }) => {
  return (
    <View
      style={[styles.container, { backgroundColor: COLORS[backgroundColor] }]}
    >
      <Text style={{ color: textColor }}>{text}</Text>
    </View>
  );
};

export default Status;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    width: "35%",
  },
});
