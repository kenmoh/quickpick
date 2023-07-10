import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { Redirect, useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

import { GOOFLE_MAP_API_KEY } from "@env";

import AppSafeAreaView from "../components/AppSafeAreaView";
import { Card, FloatingActionButton } from "../components";
import { useAuth } from "../auth/context";
import { PADDING } from "../constants/sizes";
import { COLORS } from "../constants/colors_font";

const index = () => {
  const router = useRouter();
  const { user } = useAuth();
  return (
    <AppSafeAreaView>
      <StatusBar backgroundColor={COLORS.primaryColor} barStyle="auto" />
      <View style={styles.container}>
        <Card onPress={() => router.push("orderDetails")} />

        {user?.user_type === "vendor" && (
          <FloatingActionButton
            icon={<AntDesign name="plus" size={20} color="white" />}
            onPress={() => router.push("addOrder")}
          />
        )}
      </View>
      <Redirect href={"./main"} />
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
    fontSize: 18,
  },
});
