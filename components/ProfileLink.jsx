import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import React from "react";
import { COLORS } from "../constants/colors_font";
import Divider from "./Divider";

const profileLink = ({ onPress, screenName }) => {
  return (
    <>
      <Divider />
      <TouchableOpacity style={styles.link} onPress={onPress}>
        <Text style={styles.text}>{screenName}</Text>
        <Feather name="chevrons-right" size={16} color={COLORS.darkText} />
      </TouchableOpacity>
    </>
  );
};

export default profileLink;

const styles = StyleSheet.create({
  link: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 10,
    color: "red",
  },

  text: {
    textTransform: "capitalize",
    color: COLORS.darkText,
    fontSize: 16,
  },
});
