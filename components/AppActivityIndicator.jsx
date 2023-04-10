import { StyleSheet, ActivityIndicator, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const AppActivityIndicator = ({ visible = false }) => {
  if (!visible) return null;
  return (
    <View style={styles.overlay}>
      {/* <LottieView
        source={require("../../assets/animations/circle-loading.json")}
        autoPlay
        loop
      /> */}
    </View>
  );
};

export default AppActivityIndicator;

const styles = StyleSheet.create({
  overlay: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    zIndex: 1,
    opacity: 0.8,
  },
});
