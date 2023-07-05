import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "expo-router";

import { WebView } from "react-native-webview";
import { BUTTON_SIZE } from "../constants/sizes";
import { COLORS } from "../constants/colors_font";
import { showMessage } from "react-native-flash-message";

const paymentUrl = () => {
  const [showWebView, setShowWebView] = useState(false);
  const [redirectedUrl, setRedirectedUrl] = useState(null);
  const params = useSearchParams();
  const router = useRouter();

  const { payment_url, total_cost } = params;
  const status = redirectedUrl?.url?.split("?")[1]?.split("&");

  const handleOpenWebView = () => {
    setShowWebView(true);
  };

  useEffect(() => {
    if (status?.[0] === "status=successful") {
      router.push("addOrder");
      showMessage({
        message: "Payment Successful!",
        type: "success",
      });
    }
    if (status?.[0] === "status=failed" || status?.[0] === "status=cancelled") {
      router.push("addOrder");
      showMessage({
        message: "Payment failed to complete!",
        type: "danger",
      });
    }
  }, [status]);

  return (
    <View style={styles.container}>
      {showWebView ? (
        <>
          <WebView
            source={{
              uri: payment_url,
            }}
            onNavigationStateChange={(navState) => {
              setRedirectedUrl(navState);
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
