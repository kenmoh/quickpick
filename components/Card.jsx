import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

import Divider from "./Divider";
import { COLORS } from "../constants/colors_font";

const Card = ({ order, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Divider />
      <View style={styles.card}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Image
              source={{ uri: order?.order_photo_url }}
              style={styles.imageStyle}
              resizeMode="cover"
            />
            <View style={styles.text}>
              <Text style={styles.title}>{order?.name}</Text>
              <Text style={styles.amount}>NGN {order?.total_cost}</Text>
            </View>
          </View>
          <Text style={styles.date}>{order?.created_at}</Text>
        </View>
        {/* <Divider /> */}
        <View style={styles.body}>
          <Text style={styles.title}>{order?.origin}</Text>
          <AntDesign name="swapright" size={24} color={COLORS.darkText} />
          <Text style={styles.title}>{order?.destination}</Text>
        </View>
        {/* <Divider /> */}
        <View style={styles.footer}>
          <View style={styles.footerText}>
            <Text style={styles.title}>Distance: </Text>
            <Text style={styles.distance}>{order?.distance} km</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  amount: {
    color: COLORS.headerText,
    fontSize: 12,
    fontWeight: "bold",
  },
  body: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },

  btnText: {
    color: "white",
    fontSize: 12,
    backgroundColor: COLORS.darkText,
    paddingVertical: 1,
    paddingHorizontal: 10,
    alignItems: "center",
    borderRadius: 50,
    justifyContent: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "white",
    padding: 10,
    borderColor: COLORS.borderColor,
    // borderWidth: 1,
    // borderRadius: 5,
    marginVertical: 3.5,
  },

  date: {
    color: COLORS.lightColor,
    fontSize: 12,
    marginTop: -15,
  },

  distance: {
    marginLeft: 10,
    color: COLORS.darkText,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  footerText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  imageStyle: {
    height: 50,
    width: 50,
    borderRadius: 10,
  },

  text: {
    marginLeft: 10,
  },
  title: {
    color: COLORS.darkText,
  },
});
