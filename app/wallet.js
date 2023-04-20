import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../constants/colors_font";
import { ProfileHeader } from "../components";

const wallet = () => {
  return (
    <View style={styles.container}>
      <ProfileHeader height={25} bgColor={COLORS.primaryColor} />
      <Text>wallet</Text>
    </View>
  );
};

export default wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
