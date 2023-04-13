import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Link, useRouter } from "expo-router";

import { GOOFLE_MAP_API_KEY } from "@env";

import AppSafeAreaView from "../components/AppSafeAreaView";
import { Card } from "../components";
import { PADDING } from "../constants/sizes";
import { COLORS } from "../constants/colors_font";
import { useAuth } from "../auth/context";

const index = () => {
  const router = useRouter();
  const { user } = useAuth();
  return (
    <AppSafeAreaView>
      <View style={styles.container}>
        <Text style={styles.titleText}>Orders {user?.username}</Text>
        <Card onPress={() => router.push("orderDetails")} />
        <Card onPress={() => router.push("orderDetails")} />

        <Text style={styles.link} onPress={() => router.push("addOrder")}>
          Edit Vendor
        </Text>
      </View>
    </AppSafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: PADDING.horizontalPaddingSmall,
    backgroundColor: COLORS.white,
  },
  text: {
    color: "black",
    fontSize: 35,
  },
  titleText: {
    textAlign: "center",
    marginVertical: 10,
    fontWeight: "500",
    color: COLORS.darkText,
    fontSize: 22,
  },
  link: {
    fontSize: 50,
    marginTop: 200,
  },
});
