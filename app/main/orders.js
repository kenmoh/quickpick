import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";

import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

import { PADDING } from "../../constants/sizes";
import { COLORS } from "../../constants/colors_font";
import { AppSafeAreaView, Card, FloatingActionButton } from "../../components";
import { useAuth } from "../../auth/context";

const orders = () => {
  const router = useRouter();
  const { user, signOut } = useAuth();
  return (
    <AppSafeAreaView>
      <StatusBar backgroundColor={COLORS.primaryColor} barStyle="auto" />
      <View style={styles.container}>
        <Text style={styles.titleText}>Orders</Text>
        <Card onPress={() => router.push("orderDetails")} />
        {/* Show Add button base on user(vendor) */}
        {user?.user_type === "vendor" && (
          <FloatingActionButton
            icon={<AntDesign name="plus" size={20} color="white" />}
            onPress={() => router.push("pickLocations")}
          />
        )}
      </View>
    </AppSafeAreaView>
  );
};

export default orders;

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
