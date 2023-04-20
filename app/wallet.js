import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

import { COLORS } from "../constants/colors_font";
import { BUTTON_SIZE, PADDING } from "../constants/sizes";
import { Transaction } from "../components";

const wallet = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wallet}>
        <Text style={styles.text}>Balance</Text>
        <Text style={styles.balText}>N 300</Text>
        <Text style={styles.text}>Account Number: 2020334455</Text>
      </View>
      <Pressable
        style={styles.reqFund}
        onPress={() => console.log("Resquest Send")}
      >
        <Text style={styles.btnText}>Request Fund</Text>
      </Pressable>
      <Transaction icon="arrow-up-right" />
      <Transaction icon="arrow-up-right" />
      <Transaction bgColor="#A9FBC3" iconColor="green" icon="arrow-down-left" />
      <Transaction bgColor="#A9FBC3" iconColor="green" icon="arrow-down-left" />
      <Transaction bgColor="#A9FBC3" iconColor="green" icon="arrow-down-left" />
      <Transaction icon="arrow-up-right" />
    </View>
  );
};

export default wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: PADDING.horizontalPaddingSmall,
  },

  wallet: {
    backgroundColor: COLORS.activeTrackColor,
    height: 110,
    width: "100%",
    borderRadius: BUTTON_SIZE.smallRadius,
    marginVertical: BUTTON_SIZE.btnVerticalMarginLarge,
    justifyContent: "center",
    paddingHorizontal: PADDING.horizontalPaddingSmall,
  },
  reqFund: {
    width: "70%",
    backgroundColor: COLORS.inputBackgroundColor,
    alignItems: "center",
    paddingVertical: 12.5,
    marginTop: -35,
    alignSelf: "center",
    borderRadius: BUTTON_SIZE.smallRadius,
    marginBottom: 25,
  },

  text: {
    color: COLORS.inputBackgroundColor,
    fontSize: 12,
    fontWeight: "100",
  },

  balText: {
    color: COLORS.inputBackgroundColor,
    fontSize: 14,
    fontWeight: "bold",
  },
  btnText: {
    color: COLORS.darkBlue,
    fontWeight: "bold",
    fontSize: 14,
  },
});
