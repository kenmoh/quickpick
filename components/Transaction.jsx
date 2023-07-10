import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Divider from "./Divider";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../constants/colors_font";

const Transaction = ({
  bgColor = "#FFA69E",
  iconColor = "red",
  icon,
  vendorName,
  date,
  amount,
}) => {
  return (
    <>
      <Divider />
      <View style={styles.container}>
        <View style={styles.vendor}>
          <View style={[styles.icon, { backgroundColor: bgColor }]}>
            <Feather name={icon} size={20} color={iconColor} />
          </View>
          <View>
            <Text style={styles.vendorText}>{vendorName}</Text>
            <Text style={styles.date}>{date}</Text>
          </View>
        </View>
        <Text style={styles.vendorText}>N {amount}</Text>
      </View>
    </>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  icon: {
    borderRadius: 50,
    height: 25,
    width: 25,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    marginVertical: 7.5,
  },
  vendor: {
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
  },

  vendorText: {
    color: COLORS.darkText,
    fontSize: 14,
  },
  date: {
    color: COLORS.lightColor,
  },
});
