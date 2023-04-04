import { StyleSheet, Text, View } from "react-native";

const Divider = () => {
  return <View style={styles.dividerStyle} />;
};

export default Divider;

const styles = StyleSheet.create({
  dividerStyle: {
    borderColor: "#EEEEEE",
    width: "100%",
    borderWidth: 0.25,
    marginVertical: 5,
  },
});
