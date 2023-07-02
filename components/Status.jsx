import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../constants/colors_font";

const Status = ({
  text,
  pillWidth = "35%",
  pVertical = 3,
  pHorizontal = 5,
  textColor,
  backgroundColor,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: COLORS[backgroundColor],
          width: pillWidth,
          paddingHorizontal: pHorizontal,
          paddingVertical: pVertical,
        },
      ]}
    >
      <Text style={{ color: textColor }}>{text}</Text>
    </View>
  );
};

export default Status;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});
