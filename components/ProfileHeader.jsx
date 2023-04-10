import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React from "react";
import { COLORS, FONT_WEIGHT } from "../constants/colors_font";

const ProfileHeader = ({ height = 35, bgColor = COLORS.primaryColor }) => {
  return (
    <View
      style={[styles.headerStyle, { height: height, backgroundColor: bgColor }]}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.primaryColor}
      />
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  headerStyle: {},
});
