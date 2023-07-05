import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";

import { useRouter, useNavigation } from "expo-router";

import { AppSafeAreaView, Divider, ProfileLink } from "../../components";
import { COLORS } from "../../constants/colors_font";
import { PADDING } from "../../constants/sizes";
import { useAuth } from "../../auth/context";
import walletsApi from "../../api/wallets";

const profile = () => {
  const router = useRouter();
  const { signOut, user } = useAuth();
  const navigation = useNavigation();
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
        {user?.user_type === "dispatcher" ? (
          <Text style={styles.headerText}>
            {user?.company_name.toUpperCase()}
          </Text>
        ) : (
          <Text style={styles.headerText}>{user?.username.toUpperCase()}</Text>
        )}
        <Text style={styles.headerText}>{user?.phone_number}</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          {user?.user_type === "dispatcher" && (
            <ProfileLink
              screenName={"Add Rider"}
              onPress={() => router.push("addRider")}
            />
          )}
          <ProfileLink
            screenName={"Profile"}
            onPress={() =>
              router.push(
                `${
                  user?.user_type === "dispatch"
                    ? "userProfile"
                    : user?.user_type === "vendor"
                    ? "vendorProfile"
                    : "addRider"
                }`
              )
            }
          />
          {user?.user_type === "dispatcher" && (
            <ProfileLink
              screenName={"Wallet"}
              onPress={() =>
                navigation.navigate("wallet", {
                  userId: user.id,
                })
              }
            />
          )}
          {user?.user_type === "dispatcher" && (
            <ProfileLink
              screenName={"My Riders"}
              onPress={() => router.push("listRiderScreen")}
            />
          )}
          <ProfileLink
            screenName={"Change Password"}
            onPress={() => router.push("changePassword")}
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
          {/* <TouchableOpacity onPress={handleDeleteAccount}>
            <View style={styles.deleteContainer}>
              <AntDesign name="delete" size={16} color={COLORS.errorText} />
              <Text style={styles.delete}>Dele My Accout</Text>
            </View>
          </TouchableOpacity> */}
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    marginBottom: 5,
  },
});
