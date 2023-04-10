import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { BUTTON_SIZE } from "../constants/sizes";
import { COLORS } from "../constants/colors_font";

const User = ({ iconName, text }) => {
  return (
    <View style={styles.userDetails}>
      <FontAwesome name={iconName} size={24} color="grey" />
      <Text style={{ fontSize: 18, color: "gray" }}>{text}</Text>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  userDetails: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    marginVertical: 1.8,
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: BUTTON_SIZE.smallRadius,
    elevation: 1,
  },
});
