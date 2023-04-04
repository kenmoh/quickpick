import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Link, useRouter } from "expo-router";

import AppSafeAreaView from "../components/AppSafeAreaView";
import { Header } from "../components";

const index = () => {
  const router = useRouter();
  return (
    <AppSafeAreaView>
      <Header />
      <View style={styles.container}>
        <Text style={styles.text}>Hello World!</Text>
        <Link href="/signin">Sign In</Link>
      </View>
    </AppSafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "black",
    fontSize: 35,
  },
});
