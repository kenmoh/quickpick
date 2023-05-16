import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../constants/colors_font";
import { BUTTON_SIZE, FONT_SIZE } from "../constants/sizes";

const OrderBtn = ({
  textSize = "smallText",
  btnColor,
  title,
  textColor = "primaryColor",
  width = "largeBtnWidth",
  height = 30,
  disabled = false,
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.btnStyle,
        {
          width: BUTTON_SIZE[width],
          backgroundColor: COLORS[btnColor],
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

export default OrderBtn;

const styles = StyleSheet.create({
  btnStyle: {
    width: BUTTON_SIZE.largeBtnWidth,
    borderTopEndRadius: BUTTON_SIZE.mediumRadius,
    borderTopStartRadius: BUTTON_SIZE.mediumRadius,
    justifyContent: "center",
    alignItems: "center",
  },

  btnText: {
    textTransform: "uppercase",
    fontWeight: "normal",
  },
});
