import { StyleSheet, Text, View } from "react-native";

const Divider = ({ margin }) => {
  return <View style={[styles.dividerStyle, { marginVertical: margin }]} />;
};

export default Divider;

const styles = StyleSheet.create({
  dividerStyle: {
    borderColor: "#EEEEEE",
    width: "100%",
    borderWidth: 0.25,
  },
});
