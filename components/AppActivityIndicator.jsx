import { StyleSheet, ActivityIndicator, View, Platform } from "react-native";
import React from "react";

const AppActivityIndicator = ({ visible = false }) => {
  if (!visible) return null;
  return (
    <View style={styles.overlay}>
      <ActivityIndicator
        animating={visible}
        size={Platform.OS === "ios" ? "large" : 55}
        color={"skyblue"}
      />
    </View>
  );
};

export default AppActivityIndicator;

const styles = StyleSheet.create({
  overlay: {
    height: "155%",
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    zIndex: 1,
    opacity: 0.8,
    justifyContent: "center",
  },
});
