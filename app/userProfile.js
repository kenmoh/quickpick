import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React from "react";
import { AppSafeAreaView, Divider, ProfileHeader, User } from "../components";

const updateProfile = () => {
  const img =
    "https://a.cdn-hotels.com/gdcs/production0/d1513/35c1c89e-408c-4449-9abe-f109068f40c0.jpg?impolicy=fcrop&w=800&h=533&q=medium";
  return (
    <AppSafeAreaView>
      <ProfileHeader height={50} />
      <View style={styles.imageContainer}>
        <Image source={{ uri: img }} style={styles.image} />
        <Text style={styles.text}>Kenmoh</Text>
      </View>
      <Divider />
      <View style={styles.container} showsVerticalScrollIndicator={false}>
        <User iconName={"user-o"} text={"Kenneth Aremoh"} />
        <User iconName={"phone"} text={"080998899877"} />
        <User iconName={"envelope"} text={"Kenneth.aremoh@gmail.com"} />
        <User iconName={"bank"} text={"GTBank"} />
        <User iconName={"map-marker"} text={"Lagos"} />
        <User iconName={"building"} text={"QuickPick Ltd"} />
      </View>
    </AppSafeAreaView>
  );
};

export default updateProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
  },
  imageContainer: {
    marginLeft: 10,
    width: 85,
    height: 85,
    alignItems: "flex-start",
  },
  image: {
    marginTop: -40,
    width: 85,
    height: 85,
    borderRadius: 100,
  },
  text: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
