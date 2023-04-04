import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../constants/colors_font";
import { BUTTON_SIZE, FONT_SIZE } from "../constants/sizes";

const AppButton = ({
  textSize = "smallText",
  borderRadius,
  btnColor,
  title,
  textColor = "primaryColor",
  width = "largeBtnWidth",
  height = 40,
  verticalMargin = "btnVerticalMarginLarge",
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.btnStyle,
        {
          width: BUTTON_SIZE[width],
          backgroundColor: COLORS[btnColor],
          borderRadius: BUTTON_SIZE[borderRadius],
          marginVertical: BUTTON_SIZE[verticalMargin],
          height: height,
        },
      ]}
    >
      <Text
        style={[
          styles.btnText,
          { color: COLORS[textColor], fontSize: FONT_SIZE[textSize] },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  btnStyle: {
    width: BUTTON_SIZE.largeBtnWidth,
    // height: 40,
    borderRadius: BUTTON_SIZE.largeRadius,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: BUTTON_SIZE.btnVerticalMarginLarge,
  },

  btnText: {
    textTransform: "uppercase",
    fontWeight: "normal",
  },
});
