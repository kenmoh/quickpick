import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useState } from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors_font";
import AppSafeAreaView from "./AppSafeAreaView";

const AppPicker = ({ pickerHeight, pickerWidth }) => {
  const [showPicker, setShowPicker] = useState(false);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setShowPicker(true)}>
        <View
          styles={[
            styles.container,
            { height: pickerHeight, width: pickerWidth },
          ]}
        >
          <Text>Filter by</Text>
          <MaterialCommunityIcons name="chevron-down" size={20} />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={showPicker} animationType="slide">
        <AppSafeAreaView>
          <Button title="close" onPress={() => setShowPicker(false)} />
        </AppSafeAreaView>
      </Modal>
    </>
  );
};

export default AppPicker;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.inputBackgroundColor,
    borderColor: COLORS.inputLabelText,
    alignItems: "center",
    paddingHorizontal: 10,
    flexDirection: "row",
    borderRadius: 3,
  },
});
