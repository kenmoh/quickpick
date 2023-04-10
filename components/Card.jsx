import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Divider from "./Divider";
import { COLORS } from "../constants/colors_font";

const Card = ({ order, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Image
              source={{
                uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
              }}
              style={styles.imageStyle}
              resizeMode="contain"
            />
            <View style={styles.text}>
              <Text style={styles.title}>Order</Text>
              <Text style={styles.amount}>NGN 3000</Text>
            </View>
          </View>
          <Text style={styles.date}>12-04-2023</Text>
        </View>
        <Divider />
        <View style={styles.body}>
          <Text style={styles.title}>Lakowe</Text>
          <AntDesign name="swapright" size={24} color={COLORS.darkText} />
          <Text style={styles.title}>Lekki</Text>
        </View>
        <Divider />
        <View style={styles.footer}>
          <View style={styles.footerText}>
            <Text style={styles.title}>Distance: </Text>
            <Text style={styles.distance}>4.88 km</Text>
          </View>

          {/* {order.is_picked_up ? (
            <Text style={styles.btnText}>Pending</Text>
          ) : order.order_is_delivered ? (
            <Text style={styles.btnText}>Delivered</Text>
          ) : (
            ""
          )} */}
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
    elevation: 1,
    borderRadius: 5,
    marginVertical: 2.5,
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
