import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import { WebView } from "react-native-webview";
import { BUTTON_SIZE } from "../constants/sizes";
import { COLORS } from "../constants/colors_font";
import { AppImagePicker } from "../components";

const paymentUrl = ({
  url = "https://ravemodal-dev.herokuapp.com/v3/hosted/pay/d1b222ac964b749e0663",
}) => {
  const [showWebView, setShowWebView] = React.useState(false);

  const handleOpenWebView = () => {
    setShowWebView(true);
  };

  return (
    <View style={styles.container}>
      <AppImagePicker />
      {!showWebView && <Text style={styles.text}>Pay to N500 list item</Text>}
      {showWebView ? (
        <WebView
          source={{
            uri: url,
          }}
        />
      ) : (
        <TouchableOpacity onPress={handleOpenWebView} style={styles.button}>
          <Text style={styles.buttonText}>pay</Text>
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
    letterSpacing: 10,
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
