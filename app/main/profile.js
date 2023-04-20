import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import React from "react";

import { useRouter } from "expo-router";

import { AppSafeAreaView, Divider, ProfileLink } from "../../components";
import { COLORS } from "../../constants/colors_font";
import { PADDING } from "../../constants/sizes";
import { useAuth } from "../../auth/context";

const profile = () => {
  const router = useRouter();
  const { signOut } = useAuth();
  const handleDeleteAccount = () => {
    console.log("Account Deleted!!!");
  };
  return (
    <AppSafeAreaView>
      <View
        style={{
          backgroundColor: COLORS.primaryColor,
          height: 50,
          width: "100%",
        }}
      />
      <View style={styles.header}>
        <Image
          style={{
            resizeMode: "contain",
            width: 60,
            height: 60,
            borderRadius: 50,
            marginTop: -30,
          }}
          source={{
            uri: "https://mohdelivery.s3.amazonaws.com/00a54cfc66fa14eb4fa10235twitter.jpeg",
          }}
        />
        <Text style={styles.text}>Name or Company name</Text>
        <Text style={styles.headerText}>+2348088776655</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <ProfileLink
            screenName={"Profile"}
            onPress={() => router.push("userProfile")}
          />
          <ProfileLink
            screenName={"Wallet"}
            onPress={() => router.push("wallet")}
          />
          <ProfileLink
            screenName={"About"}
            onPress={() => router.push("about")}
          />
          <ProfileLink
            screenName={"Support"}
            onPress={() => router.push("support")}
          />
        </View>
        <View style={styles.btmContainer}>
          <TouchableOpacity onPress={signOut}>
            <View style={styles.logoutContainer}>
              <AntDesign name="logout" size={16} color={COLORS.darkText} />
              <Text style={styles.logout}>Logout</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDeleteAccount}>
            <View style={styles.deleteContainer}>
              <AntDesign name="delete" size={16} color={COLORS.errorText} />
              <Text style={styles.delete}>Dele My Accout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </AppSafeAreaView>
  );
};

export default profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: PADDING.horizontalPaddingSmall,
    backgroundColor: COLORS.white,
  },

  topContainer: {
    flex: 1,
  },
  btmContainer: {
    alignSelf: "flex-start",
    flexDirection: "row",
    columnGap: 50,
    marginVertical: 15,
  },
  logout: {
    color: COLORS.darkText,
    fontSize: 14,
  },
  logoutContainer: {
    flexDirection: "row",
    columnGap: 5,
  },
  deleteContainer: {
    flexDirection: "row",
    columnGap: 5,
  },
  delete: {
    color: COLORS.errorText,
    fontSize: 14,
  },

  header: {
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  headerText: {
    fontSize: 12,
    color: COLORS.darkText,
    marginBottom: 25,
  },
});
