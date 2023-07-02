import { StyleSheet, Text, View, Image } from "react-native";
import { COLORS } from "../constants/colors_font";
import Divider from "./Divider";

const RiderCard = ({ fullName, imageUrl, phoneNumber, plateNumber }) => {
  return (
    <View style={styles.container}>
      <Divider />
      <View style={styles.topWrapper}>
        <View style={styles.header}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.imageStyle}
            resizeMode="cover"
          />
          <View style={styles.text}>
            <Text style={styles.title}>{fullName}</Text>
            <Text style={styles.phoneNumber}>{phoneNumber} </Text>
          </View>
        </View>
      </View>
      <View style={styles.btmWrapper}>
        <Text style={styles.text}>Plate Number</Text>
        <Text style={styles.text}>{plateNumber.toUpperCase()}</Text>
      </View>
    </View>
  );
};

export default RiderCard;

const styles = StyleSheet.create({
  phoneNumber: {
    color: COLORS.darkText,
    fontSize: 12,
    fontWeight: "bold",
  },
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
    marginVertical: 5,
    width: "95%",
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  imageStyle: {
    height: 50,
    width: 50,
    borderRadius: 10,
  },

  text: {
    color: "grey",
  },
  title: {
    color: COLORS.headerText,
  },
});
