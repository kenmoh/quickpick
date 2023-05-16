import { StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../constants/colors_font";

const FloatingActionButton = ({ icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.floatingActionBtn} onPress={onPress}>
      {icon}
    </TouchableOpacity>
  );
};

export default FloatingActionButton;

const styles = StyleSheet.create({
  floatingActionBtn: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.secondaryColor,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 30,
    right: 10,
    elevation: 10,
    zIndex: 999,
  },
});
