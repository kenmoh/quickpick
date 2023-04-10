import { StyleSheet, Text, View, Switch, Pressable } from "react-native";
import { useState } from "react";
import { COLORS } from "../constants/colors_font";
import Divider from "./Divider";

const RiderCard = ({ fullName, phoneNumber, bankNamem, accountNumber }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const handleSwitchToggle = async (value) => {
    setIsEnabled(value);
    console.log("The value is: ", value);
  };
  return (
    <View style={styles.container}>
      <View style={styles.topWrapper}>
        <View>
          <Text
            style={[
              styles.text,
              {
                textTransform: "uppercase",
                marginBottom: 5,
                fontWeight: "bold",
              },
            ]}
          >
            {fullName}
          </Text>
          <Text style={styles.text}>{phoneNumber}</Text>
        </View>
        <Pressable onPress={() => handleSwitchToggle(!isEnabled)}>
          <Switch
            trackColor={{
              false: COLORS.inActivetrackColor,
              true: COLORS.activeTrackColor,
            }}
            thumbColor={isEnabled ? COLORS.primaryColor : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={handleSwitchToggle}
            value={isEnabled}
          />
        </Pressable>
      </View>
      <Divider />
      <View style={styles.btmWrapper}>
        <Text style={styles.text}>{bankNamem}</Text>
        <Text style={styles.text}>{accountNumber}</Text>
      </View>
    </View>
  );
};

export default RiderCard;

const styles = StyleSheet.create({
  topWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  btmWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  container: {
    paddingHorizontal: 5,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    elevation: 1,
    marginVertical: 2,
    width: "95%",
    alignSelf: "center",
  },
  text: {
    color: "grey",
  },
});
