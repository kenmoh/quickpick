import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { RiderCard } from "../components";

const listRiderScreen = () => {
  return (
    <View style={styles.container}>
      {/* IMPLEMENT SEARCH */}
      <ScrollView style={{ width: "100%", marginTop: 10 }}>
        <RiderCard
          accountNumber={"0033445566"}
          bankNamem="GTBank"
          fullName="Kenneth Aremoh"
          phoneNumber={"09088998877"}
        />
      </ScrollView>
    </View>
  );
};

export default listRiderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  text: {
    marginVertical: 15,
    color: "gray",
    textTransform: "uppercase",
  },
});
