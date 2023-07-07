import { StyleSheet, Text, View, Image } from "react-native";
import { COLORS } from "../constants/colors_font";
import Divider from "./Divider";
import profileImage from "../assets/profile.png";

const Notification = ({
  username,
  orderName,
  imageUrl,
  orderDate,
  message,
}) => {
  return (
    <View style={styles.container}>
      <Divider />
      <View style={styles.topWrapper}>
        <View style={styles.header}>
          <Image
            // source={{ uri: imageUrl }}
            source={require("../assets/profile.png")}
            style={styles.imageStyle}
            resizeMode="cover"
          />
          <View style={styles.text}>
            <Text style={styles.text}>{orderName}</Text>
            <Text style={styles.text}>{orderDate} </Text>
          </View>
        </View>
        <Text style={styles.text}>{username}</Text>
      </View>
      <View style={styles.btmWrapper}>
        <Text style={styles.text}>{message}</Text>
      </View>
    </View>
  );
};

export default Notification;

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
    textAlign: "justify",
  },
  title: {
    color: COLORS.headerText,
  },
});
