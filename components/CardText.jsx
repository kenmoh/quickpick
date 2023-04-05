import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../constants/colors_font";

const CardText = ({ title, subTitle = null, textTransform }) => {
  return (
    <View style={styles.textContainer}>
      <Text style={[styles.title, { textTransform: textTransform }]}>
        {title}
      </Text>
      <Text style={[styles.text, { textTransform: textTransform }]}>
        {subTitle}
      </Text>
    </View>
  );
};

export default CardText;

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 2.5,
  },
  title: {
    color: COLORS.darkText,
  },
  text: {
    color: COLORS.darkText,
    textAlign: "right",
  },
});
