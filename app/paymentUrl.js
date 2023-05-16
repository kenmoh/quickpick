import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useSearchParams } from "expo-router";

import { WebView } from "react-native-webview";
import { BUTTON_SIZE } from "../constants/sizes";
import { COLORS } from "../constants/colors_font";

const paymentUrl = () => {
  const [showWebView, setShowWebView] = React.useState(false);
  const params = useSearchParams();

  const { payment_url, total_cost } = params;

  const handleOpenWebView = () => {
    setShowWebView(true);
  };

  return (
    <View style={styles.container}>
      {showWebView ? (
        <>
          <WebView
            source={{
              uri: payment_url,
            }}
          />
        </>
      ) : (
        <TouchableOpacity onPress={handleOpenWebView} style={styles.button}>
          <Text style={styles.buttonText}>PAY NGN{total_cost}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default paymentUrl;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    width: BUTTON_SIZE.largeBtnWidth,
    borderRadius: BUTTON_SIZE.largeRadius,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: BUTTON_SIZE.btnVerticalMarginLarge,
    backgroundColor: COLORS.primaryColor,
    paddingVertical: 10,
    width: "90%",
    alignSelf: "center",
  },

  buttonText: {
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 18,
    color: COLORS.white,
  },
  text: {
    alignSelf: "center",
    color: "grey",
    textTransform: "uppercase",
    fontSize: 20,
  },
});
