import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React from "react";
import { COLORS, FONT_WEIGHT } from "../constants/colors_font";

const Header = ({ height = 35, bgColor = COLORS.primaryColor }) => {
  return (
    <View
      style={[styles.headerStyle, { height: height, backgroundColor: bgColor }]}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.primaryColor}
      />
      <TouchableOpacity style={styles.btnStyle}>
        <Text style={styles.textColor}>ORDERS</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.textColor}>MY ORDERS</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",
    columnGap: 50,
  },
  textColor: {
    color: COLORS.white,
    fontWeight: FONT_WEIGHT.titleTextWeight,
  },

  btnStyle: {
    borderStyle: "solid",
    borderColor: COLORS.white,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 50,
  },
});
