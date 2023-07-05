import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/colors_font";

const AppErrorMessage = ({ error, visible }) => {
  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        setIsVisible((prevState) => !prevState);
      }, 300);
    }
  }, [isVisible]);

  if (!visible || !error) return null;

  return <Text style={styles.warningText}>{error}</Text>;
};

export default AppErrorMessage;

const styles = StyleSheet.create({
  warningText: {
    color: COLORS.errorText,
    fontSize: 12,
    // textAlign: "center",
  },
});
